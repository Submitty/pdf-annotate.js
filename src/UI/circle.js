import PDFJSAnnotate from '../PDFJSAnnotate';
import config from '../config';
import { appendChild } from '../render/appendChild';
import {
  findSVGAtPoint,
  getMetadata,
  convertToSvgPoint
} from './utils';

let _enabled = false;
let _type;

/**
 * Handle document.mouseup event
 *
 * @param {Event} e The DOM event to handle
 */
function handleDocumentMouseup(e) {
  let svg = findSVGAtPoint(e.clientX, e.clientY);
  if (!svg) {
    return;
  }
  let rect = svg.getBoundingClientRect();
  saveCircle(svg, _type, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }, 15, "0000FF"
  );
}

/**
 * Save a circle annotation
 *
 * @param {String} type The type of circle (circle, emptycircle, fillcircle)
 * @param {Object} pt The point to use for annotation
 * @param {String} color The color of the rects
 */
function saveCircle(svg, type, pt, radius, color) {
  // Initialize the annotation
  let svg_pt = convertToSvgPoint([ pt.x, pt.y ], svg)
  let annotation = {
    type,
    color,
    cx: svg_pt[0],
    cy: svg_pt[1],
    r: radius
  };

  let { documentId, pageNumber } = getMetadata(svg);

  // Add the annotation
  PDFJSAnnotate.getStoreAdapter().addAnnotation(documentId, pageNumber, annotation)
    .then((annotation) => {
      appendChild(svg, annotation);
    });
}

/**
 * Enable circle behavior
 */
export function enableCircle(type) {
  _type = type;
  
  if (_enabled) { return; }

  _enabled = true;
  document.addEventListener('mouseup', handleDocumentMouseup);
}

/**
 * Disable circle behavior
 */
export function disableCircle() {
  if (!_enabled) { return; }

  _enabled = false;
  document.removeEventListener('mouseup', handleDocumentMouseup);
}
