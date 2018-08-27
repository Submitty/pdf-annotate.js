import PDFJSAnnotate from '../PDFJSAnnotate';
import config from '../config';
import {
  findAnnotationAtPoint,
  findSVGAtPoint,
  getMetadata
} from './utils';

let _canerase = false;
let userId = "user";

function handleDocumentDown(e){
  _canerase = true;
}

function handleDocumentUp(e){
  _canerase = false;
}

function handleDocumentTouchMove(e){
  erase(findAnnotationAtPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY));
}

function handleDocumentMouseMove(e){
  erase(findAnnotationAtPoint(e.clientX, e.clientY));
}

function erase(target){
  if(_canerase){
    if(target && target.getAttribute('data-pdf-annotate-userId') == userId){
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

export function enableEraser(){
  userId = PDFJSAnnotate.getStoreAdapter().userId;
  document.addEventListener('mousemove', handleDocumentMouseMove);
  document.addEventListener('mousedown', handleDocumentDown);
  document.addEventListener('mouseup', handleDocumentUp);
  document.addEventListener('touchstart', handleDocumentDown);
  document.addEventListener('touchmove', handleDocumentTouchMove);
  document.addEventListener('touchend', handleDocumentUp);
}

export function disableEraser(){
  document.removeEventListener('mousemove', handleDocumentMouseMove);
  document.removeEventListener('mousedown', handleDocumentDown);
  document.removeEventListener('mouseup', handleDocumentUp);
  document.removeEventListener('touchstart', handleDocumentDown);
  document.removeEventListener('touchmove', handleDocumentTouchMove);
  document.removeEventListener('touchend', handleDocumentUp);
}