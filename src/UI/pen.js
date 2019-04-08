import PDFJSAnnotate from '../PDFJSAnnotate';
import { appendChild } from '../render/appendChild';
import {
  disableUserSelect,
  enableUserSelect,
  findSVGAtPoint,
  getMetadata,
  convertToSvgPoint
} from './utils';

let _enabled = false;
let _candraw = false;
let _penSize;
let _penColor;
let path;
let lines = [];

/**
 * Handle document.touchdown or document.pointerdown event
 * @param {PointerEvent} e The DOM event to be handled
 */
function handleDocumentPointerdown(e) {
  e.preventDefault();
  path = null;
  lines = [];
  _candraw = true;
}

/**
 * Handle document.pointerup event
 *
 * @param {PointerEvent} e The DOM event to be handled
 */
function handleDocumentPointerup(e) {
  saveToStorage(e.clientX, e.clientY);
}

function saveToStorage(x, y) {
  _candraw = false;
  let svg;
  if (lines.length > 1 && (svg = findSVGAtPoint(x, y))) {
    let { documentId, pageNumber } = getMetadata(svg);
    PDFJSAnnotate.getStoreAdapter().addAnnotation(documentId, pageNumber, {
      type: 'drawing',
      width: _penSize,
      color: _penColor,
      lines
    }).then((annotation) => {
      if (path) {
        svg.removeChild(path);
      }

      appendChild(svg, annotation);
    });
  }
}

/**
 * Handle document.mousemove event
 *
 * @param {PointerEvent} e The DOM event to be handled
 */
function handleDocumentPointermove(e) {
  if (!e.srcElement.classList.contains('annotationLayer')) {
    return;
  }
  if (_candraw) {
    savePoint(e.clientX, e.clientY);
  }
}

/**
 * Handle document.keyup event
 *
 * @param {KeyboardEvent} e The DOM event to be handled
 * } e The DOM event to be handled
 */
function handleDocumentKeyup(e) {
  // Cancel rect if Esc is pressed
  if (e.keyCode === 27) {
    lines = null;
    path.parentNode.removeChild(path);
    document.removeEventListener('pointermove', handleDocumentPointermove);
    document.removeEventListener('pointerup', handleDocumentPointerup);
  }
}

/**
 * Save a point to the line being drawn.
 *
 * @param {Number} x The x coordinate of the point
 * @param {Number} y The y coordinate of the point
 */
function savePoint(x, y) {
  let svg = findSVGAtPoint(x, y);
  if (!svg) {
    return;
  }

  let rect = svg.getBoundingClientRect();
  let point = convertToSvgPoint([
    x - rect.left,
    y - rect.top
  ], svg);
  point[0] = point[0].toFixed(2);
  point[1] = point[1].toFixed(2);
  lines.push(point);

  if (lines.length <= 1) {
    return;
  }

  if (path) {
    svg.removeChild(path);
  }

  path = appendChild(svg, {
    type: 'drawing',
    color: _penColor,
    width: _penSize,
    lines
  });
}

/**
 * Set the attributes of the pen.
 *
 * @param {Number} penSize The size of the lines drawn by the pen
 * @param {String} penColor The color of the lines drawn by the pen
 */
export function setPen(penSize = 1, penColor = '000000') {
  _penSize = parseInt(penSize, 10);
  _penColor = penColor;
}

/**
 * Enable the pen behavior
 */
export function enablePen() {
  if (_enabled) {
    return;
  }

  _enabled = true;
  // Chrome and Firefox has different behaviors with how pen works, so we need different events.
  document.addEventListener('pointerdown', handleDocumentPointerdown);
  document.addEventListener('pointermove', handleDocumentPointermove);
  document.addEventListener('pointerup', handleDocumentPointerup);

  document.addEventListener('keyup', handleDocumentKeyup);
  disableUserSelect();
}

/**
 * Disable the pen behavior
 */
export function disablePen() {
  if (!_enabled) {
    return;
  }

  _enabled = false;
  document.removeEventListener('pointerdown', handleDocumentPointerdown);
  document.removeEventListener('pointermove', handleDocumentPointermove);
  document.removeEventListener('pointerup', handleDocumentPointerup);

  document.removeEventListener('keyup', handleDocumentKeyup);
  enableUserSelect();
}

