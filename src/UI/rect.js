import PDFJSAnnotate from '../PDFJSAnnotate';
import config from '../config';
import { appendChild } from '../render/appendChild';
import {
  BORDER_COLOR,
  convertToSvgRect,
  disableUserSelect,
  enableUserSelect,
  findSVGAtPoint,
  getMetadata,
  pointIntersectsAnnotation,
  rectCrossesAnnotation
} from './utils';

let _enabled = false;
let _type;
let overlay;
let originY;
let originX;

/**
 * Get the current window selection as rects
 *
 * @return {Array} An Array of rects
 */
function getSelectionRects() {
  try {
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    let rects = range.getClientRects();

    if (rects.length > 0 && rects[0].width > 0 && rects[0].height > 0) {
      return rects;
    }
  }
  catch (e) {}

  return null;
}

function handleMouseDownAction(e, svg, options) {
  let rect = svg.getBoundingClientRect();
  originY = e.clientY;
  originX = e.clientX;

  overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.top = `${originY - rect.top}px`;
  overlay.style.left = `${originX - rect.left}px`;
  overlay.style.border = `3px solid ${BORDER_COLOR}`;
  overlay.style.borderRadius = '3px';
  svg.parentNode.appendChild(overlay);

  document.addEventListener('mousemove', (e) =>
    handleDocumentMousemove(e, options)
  );
  disableUserSelect();
}

/**
 * Handle document.mousedown event
 *
 * @param {Event} e The DOM event to handle
 * @param {{RectOptions}} options The selected tool type
 */
function handleDocumentMousedown(e, options = {}) {
  let svg;
  if (_type !== 'area' || !(svg = findSVGAtPoint(e.clientX, e.clientY))) {
    return;
  }

  if (options.exclusive) {
    PDFJSAnnotate.getStoreAdapter()
      .getAnnotations(options.documentId, options.pageNumber)
      .then((data) => {
        options.annotations = data.annotations;
        for (const annotation of options.annotations) {
          if (
            pointIntersectsAnnotation(e.clientX, e.clientY, annotation, svg)
          ) {
            return;
          }
        }
        handleMouseDownAction(e, svg, options);
      });
    return;
  }

  handleMouseDownAction(e, svg, options);
}

/**
 * Handle document.mousemove event
 *
 * @param {Event} e The DOM event to handle
 * @param {{RectOptions}} options The selected tool type
 */
function handleDocumentMousemove(e, options) {
  if (!overlay) return;
  let svg = overlay.parentNode.querySelector(config.annotationSvgQuery());
  let rect = svg.getBoundingClientRect();
  let no_intersection = true;
  if (options.exclusive) {
    for (const annotation of options.annotations) {
      if (
        pointIntersectsAnnotation(e.clientX, e.clientY, annotation, svg) ||
        rectCrossesAnnotation(
          originX,
          originY,
          e.clientX,
          e.clientY,
          annotation,
          svg
        )
      ) {
        no_intersection = false;
      }
    }
  }
  if (originX + (e.clientX - originX) < rect.right) {
    if (no_intersection) overlay.style.width = `${e.clientX - originX}px`;
  }

  if (originY + (e.clientY - originY) < rect.bottom) {
    if (no_intersection) {
      overlay.style.height = `${e.clientY - originY}px`;
    }
  }
}

/**
 * Handle document.mouseup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentMouseup(e, options) {
  let rects;
  if (_type !== 'area' && (rects = getSelectionRects())) {
    saveRect(
      _type,
      [...rects].map((r) => {
        return {
          top: r.top,
          left: r.left,
          width: r.width,
          height: r.height
        };
      }),
      undefined,
      options.annotation_type
    );
  }
  else if (_type === 'area' && overlay) {
    let svg = overlay.parentNode.querySelector(config.annotationSvgQuery());
    let rect = svg.getBoundingClientRect();
    saveRect(
      _type,
      [
        {
          top: parseInt(overlay.style.top, 10) + rect.top,
          left: parseInt(overlay.style.left, 10) + rect.left,
          width: parseInt(overlay.style.width, 10),
          height: parseInt(overlay.style.height, 10)
        }
      ],
      undefined,
      options.annotation_type
    );

    overlay.parentNode.removeChild(overlay);
    overlay = null;

    document.removeEventListener('mousemove', handleDocumentMousemove);
    enableUserSelect();
  }
}

/**
 * Handle document.keyup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentKeyup(e) {
  // Cancel rect if Esc is pressed
  if (e.keyCode === 27) {
    let selection = window.getSelection();
    selection.removeAllRanges();
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
      overlay = null;
      document.removeEventListener('mousemove', handleDocumentMousemove);
    }
  }
}

/**
 * Save a rect annotation
 *
 * @param {String} type The type of rect (area, highlight, strikeout)
 * @param {Array} rects The rects to use for annotation
 * @param {String} color The color of the rects
 */
function saveRect(type, rects, color, annotation_type) {
  let svg = findSVGAtPoint(rects[0].left, rects[0].top);
  let annotation;

  if (!svg) {
    return;
  }

  let boundingRect = svg.getBoundingClientRect();

  if (!color) {
    if (type === 'highlight') {
      color = 'FFFF00';
    }
    else if (type === 'strikeout') {
      color = 'FF0000';
    }
  }

  // Initialize the annotation
  annotation = {
    type,
    color,
    rectangles: [...rects]
      .map((r) => {
        let offset = 0;

        if (type === 'strikeout') {
          offset = r.height / 2;
        }

        return convertToSvgRect(
          {
            y: r.top + offset - boundingRect.top,
            x: r.left - boundingRect.left,
            width: r.width,
            height: r.height
          },
          svg
        );
      })
      .filter((r) => r.width > 0 && r.height > 0 && r.x > -1 && r.y > -1)
  };

  // Short circuit if no rectangles exist
  if (annotation.rectangles.length === 0) {
    return;
  }

  annotation.annotation_type = annotation_type;
  // Special treatment for area as it only supports a single rect
  if (type === 'area') {
    let rect = annotation.rectangles[0];
    delete annotation.rectangles;
    annotation.x = rect.x;
    annotation.y = rect.y;
    annotation.width = rect.width;
    annotation.height = rect.height;
  }

  let { documentId, pageNumber } = getMetadata(svg);

  // Add the annotation
  PDFJSAnnotate.getStoreAdapter()
    .addAnnotation(documentId, pageNumber, annotation)
    .then((annotation) => {
      appendChild(svg, annotation);
    });
}

/**
 * Rect Options Type
 * @typedef {{
 *  exclusive: boolean;
 *  documentId?: string;
 *  pageNumber?: number;
 *  annotation_type?: string;
 * }} RectOptions
 */

let handleDocumentMouseupWrapper;
let handleDocumentMousedownWrapper;
let handleDocumentKeyupWrapper;
/**
 * Enable rect behavior
 *
 * @param {String} type The selected tool type
 * @param {RectOptions} options The selected tool type
 */
export function enableRect(type, options = {}) {
  _type = type;
  if (_enabled) {
    return;
  }

  handleDocumentMouseupWrapper = (e) => handleDocumentMouseup(e, options);
  handleDocumentMousedownWrapper = (e) => handleDocumentMousedown(e, options);
  handleDocumentKeyupWrapper = (e) => handleDocumentKeyup(e, options);

  _enabled = true;
  document.addEventListener('mouseup', handleDocumentMouseupWrapper);
  document.addEventListener('mousedown', handleDocumentMousedownWrapper);
  document.addEventListener('keyup', handleDocumentKeyupWrapper);
}

/**
 * Disable rect behavior
 */
export function disableRect() {
  if (!_enabled) {
    return;
  }

  _enabled = false;
  if (handleDocumentMouseupWrapper) {
    document.removeEventListener('mouseup', handleDocumentMouseupWrapper);
  }
  if (handleDocumentMousedownWrapper) {
    document.removeEventListener('mousedown', handleDocumentMousedownWrapper);
  }
  if (handleDocumentKeyupWrapper) {
    document.removeEventListener('keyup', handleDocumentKeyupWrapper);
  }
}
