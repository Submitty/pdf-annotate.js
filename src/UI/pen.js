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
 */
function handleDocumentPointerdown(e) {
  path = null;
  lines = [];
  _candraw = true;
}

/**
 * Handle document.touchup or document.pointerup event
 *
 * @param {Event} e The DOM event to be handled
 */
function handleDocumentKeyupChrome(e){
  saveToStorage(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
}

function handleDocumentPointerup(e) {
  saveToStorage(e.clientX, e.clientY);
}

function saveToStorage(x, y){
  _candraw = false;
  let svg;
  if (lines.length > 1 && (svg = findSVGAtPoint(x, y))) {
    let { documentId, pageNumber } = getMetadata(svg);

    PDFJSAnnotate.getStoreAdapter().addAnnotation(documentId, pageNumber, {
        type: 'drawing',
        width: _penSize,
        color: _penColor,
        lines
      }
    ).then((annotation) => {
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
 * @param {Event} e The DOM event to be handled
 */
function handleDocumentPointermove(e) {
  if(_candraw){
    savePoint(e.clientX, e.clientY);
  }
}

function handleDocumentPointermoveChrome(e){
  savePoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
}

/**
 * Handle document.keyup event
 *
 * @param {Event} e The DOM event to be handled
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
  if (_enabled) { return; }

  _enabled = true;
  // Chrome and Firefox has different behaviors with how pen works, so we need different events.
  if (navigator.userAgent.indexOf("Chrome") !== -1){
    document.addEventListener('touchstart', handleDocumentPointerdown);
    document.addEventListener('touchmove', handleDocumentPointermoveChrome);
    document.addEventListener('touchend', handleDocumentKeyupChrome);
    document.addEventListener('mousedown', handleDocumentPointerdown);
    document.addEventListener('mousemove', handleDocumentPointermove);
    document.addEventListener('mouseup', handleDocumentPointerup);
  } else {
    document.addEventListener('pointerdown', handleDocumentPointerdown);
    document.addEventListener('pointermove', handleDocumentPointermove);
    document.addEventListener('pointerup', handleDocumentPointerup);
  }
  document.addEventListener('keyup', handleDocumentKeyup);
  disableUserSelect();
}

/**
 * Disable the pen behavior
 */
export function disablePen() {
  if (!_enabled) { return; }

  _enabled = false;
  if (navigator.userAgent.indexOf("Chrome") !== -1){
    document.removeEventListener('touchstart', handleDocumentPointerdown);
    document.removeEventListener('touchmove', handleDocumentPointermoveChrome);
    document.removeEventListener('touchend', handleDocumentKeyupChrome);
    document.removeEventListener('mousedown', handleDocumentPointerdown);
    document.removeEventListener('mousemove', handleDocumentPointermove);
    document.removeEventListener('mouseup', handleDocumentPointerup);
  } else {
    document.removeEventListener('pointerdown', handleDocumentPointerdown);
    document.removeEventListener('pointermove', handleDocumentPointermove);
    document.removeEventListener('pointerup', handleDocumentPointerup);
  }
  document.removeEventListener('keyup', handleDocumentKeyup);
  enableUserSelect();
}

