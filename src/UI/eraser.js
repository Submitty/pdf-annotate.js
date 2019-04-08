import PDFJSAnnotate from '../PDFJSAnnotate';
import {
  findAnnotationAtPoint,
  getMetadata
} from './utils';

let _canerase = false;
let previousPoint = null;

/**
 *
 * @param {PointerEvent} e DOM event to handle
 */
function handleDocumentDown(e) {
  _canerase = true;
  previousPoint = [e.clientX, e.clientY];
}

/**
 *
 * @param {PointerEvent} e DOM event to handle
 */
function handleDocumentUp(e) {
  _canerase = false;
  erase(findAnnotationAtPoint(e.clientX, e.clientY));
}

/**
 *
 * @param {PointerEvent} e DOM event to handle
 */
function handleDocumentMouseMove(e) {
  if (!_canerase) {
    return;
  }

  // This algorithm attempts to get the various points between the last
  // PointerEvent and this one
  let check = [];
  let diffX = Math.abs(previousPoint[0] - e.clientX);
  let diffY = Math.abs(previousPoint[1] - e.clientY);
  if (diffX >= 1 || diffY >= 1) {
    let maxSteps = Math.round(Math.max(diffX, diffY));
    let subStepSize = Math.min(diffX, diffY) / maxSteps;
    let smallerTest = diffX < diffY;
    let startPoint = [
      Math.min(previousPoint[0], e.clientX),
      Math.min(previousPoint[1], e.clientY)
    ];
    for (let i = 0; i < maxSteps; i++) {
      if (smallerTest) {
        check.push([Math.round(startPoint[0] + (subStepSize * i)), Math.round(startPoint[1] + i)]);
      }
      else {
        check.push([Math.round(startPoint[0] + i), Math.round(startPoint[1] + (subStepSize * i))]);
      }
    }
  }
  for (let point of check) {
    erase(findAnnotationAtPoint(point[0], point[1]));
  }
  previousPoint = [e.clientX, e.clientY];
}

function erase(target) {
  if (!_canerase) {
    return;
  }

  if (target) {
    let { documentId } = getMetadata(target.parentElement);
    let annotationId = target.getAttribute('data-pdf-annotate-id');
    PDFJSAnnotate.getStoreAdapter().deleteAnnotation(documentId, annotationId).then(() => {
      let nodes = document.querySelectorAll(`[data-pdf-annotate-id="${annotationId}"]`);
      [...nodes].forEach((n) => {
        n.parentNode.removeChild(n);
      });
    });
  }
}

export function enableEraser() {
  document.addEventListener('pointermove', handleDocumentMouseMove);
  document.addEventListener('pointerdown', handleDocumentDown);
  document.addEventListener('pointerup', handleDocumentUp);
}

export function disableEraser() {
  document.removeEventListener('pointermove', handleDocumentMouseMove);
  document.removeEventListener('pointerdown', handleDocumentDown);
  document.removeEventListener('pointerup', handleDocumentUp);
}
