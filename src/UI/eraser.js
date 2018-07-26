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
    console.log(target);
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