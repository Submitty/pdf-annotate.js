import PDFJSAnnotate from '../PDFJSAnnotate';
import config from '../config';
import {
  findAnnotationAtPoint,
  findSVGAtPoint,
  getMetadata
} from './utils';

let _canerase = false;
let userId = "user";

function handleDocumentMouseDown(e){
  _canerase = true;
}

function handleDocumentMouseUp(e){
  _canerase = false;
}

function handleDocumentMouseMove(e){
  if(_canerase){
    let target = findAnnotationAtPoint(e.clientX, e.clientY);
    if(target && target.getAttribute('data-pdf-annotate-userId') == userId){
      let { documentId } = getMetadata(target.parentElement);
      let annotationId = target.getAttribute('data-pdf-annotate-id');
      let nodes = document.querySelectorAll(`[data-pdf-annotate-id="${annotationId}"]`);
      [...nodes].forEach((n) => {
        n.parentNode.removeChild(n);
      });
      
      PDFJSAnnotate.getStoreAdapter().deleteAnnotation(documentId, annotationId);
    }
  }
}

export function enableEraser(){
  userId = PDFJSAnnotate.getStoreAdapter().userId;
  document.addEventListener('mousemove', handleDocumentMouseMove);
  document.addEventListener('mousedown', handleDocumentMouseDown);
  document.addEventListener('mouseup', handleDocumentMouseUp);
}

export function disableEraser(){
  document.removeEventListener('mousemove', handleDocumentMouseMove);
  document.removeEventListener('mousedown', handleDocumentMouseDown);
  document.removeEventListener('mouseup', handleDocumentMouseUp);
}