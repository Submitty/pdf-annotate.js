import PDFJSAnnotate from '../PDFJSAnnotate';
import {
  findAnnotationAtPoint,
  getMetadata
} from './utils';

let _canerase = false;

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
