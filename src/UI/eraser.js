import PDFJSAnnotate from '../PDFJSAnnotate';
import config from '../config';
import {
  findAnnotationAtPoint,
  findSVGAtPoint,
  getMetadata
} from './utils';

let _canerase = false;
let userId = "user";

/**
 *
 * @param {PointerEvent} e
 */
function handleDocumentDown(e) {
  _canerase = true;
}

/**
 *
 * @param {PointerEvent} e
 */
function handleDocumentUp(e) {
  _canerase = false;
}

/**
 *
 * @param {PointerEvent} e
 */
function handleDocumentMouseMove(e) {
  erase(findAnnotationAtPoint(e.clientX, e.clientY));
}

function erase(target) {
  if(_canerase){
    if(target && target.getAttribute('data-pdf-annotate-userId') === userId){
      let { documentId } = getMetadata(target.parentElement);
      let annotationId = target.getAttribute('data-pdf-annotate-id');
      let nodes = document.querySelectorAll(`[data-pdf-annotate-id="${annotationId}"]`);
      [...nodes].forEach((n) => {
        n.parentNode.removeChild(n);
      });

      PDFJSAnnotate.getStoreAdapter().deleteAnnotation(documentId, userId, annotationId);
    }
  }
}

export function enableEraser() {
  userId = PDFJSAnnotate.getStoreAdapter().userId;
  document.addEventListener('pointermove', handleDocumentMouseMove);
  document.addEventListener('pointerdown', handleDocumentDown);
  document.addEventListener('pointerup', handleDocumentUp);
}

export function disableEraser() {
  document.removeEventListener('pointermove', handleDocumentMouseMove);
  document.removeEventListener('pointerdown', handleDocumentDown);
  document.removeEventListener('pointerup', handleDocumentUp);
}
