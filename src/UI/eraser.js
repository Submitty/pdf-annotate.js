import PDFJSAnnotate from '../PDFJSAnnotate';
import {
  findAnnotationAtPoint,
  findSVGAtPoint
} from './utils';

let _canerase = false;

function handleDocumentMouseDown(e){
  _canerase = true;
}

function handleDocumentMouseUp(e){
  _canerase = false;
}

function handleDocumentMouseMove(e){
  if(_canerase){
    let target = findAnnotationAtPoint(e.clientX, e.clientY);
    if(target){
      console.log(target);
      let annotationId = target.getAttribute('data-pdf-annotate-id');
      // let nodes = document.querySelectorAll(`[data-pdf-annotate-id="${annotationId}"]`);
      // let svg = overlay.parentNode.querySelector(config.annotationSvgQuery());
      // let { documentId } = getMetadata(svg);
    
      // [...nodes].forEach((n) => {
      //   n.parentNode.removeChild(n);
      // });
      
      // PDFJSAnnotate.getStoreAdapter().deleteAnnotation(documentId, annotationId);
    }
  }
}

export function enableEraser(){
  document.addEventListener('mousemove', handleDocumentMouseMove);
  document.addEventListener('mousedown', handleDocumentMouseDown);
  document.addEventListener('mouseup', handleDocumentMouseUp);
}

export function disableEraser(){
  document.removeEventListener('mousemove', handleDocumentMouseMove);
}