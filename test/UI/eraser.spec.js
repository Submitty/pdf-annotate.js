import { equal } from 'assert';
import PDFJSAnnotate from '../../src/PDFJSAnnotate';
import { enableEraser, disableEraser } from '../../src/UI/eraser';

import { firePointerEvent } from '../fireEvent';
import mockDeleteAnnotation from '../mockDeleteAnnotation';
import mockGetAnnotations from '../mockGetAnnotations';
import mockSVGContainer from '../mockSVGContainer';
import mockTextAnnotation from '../mockTextAnnotation';

let svg;
let text;
let deleteAnnotationSpy;
let __deleteAnnotation = PDFJSAnnotate.__storeAdapter.deleteAnnotation;
let __getAnnotations = PDFJSAnnotate.__storeAdapter.getAnnotations;

function simulateEraserMovement() {
  firePointerEvent(svg, 'pointerdown', {
    clientX: 10,
    clientY: 10,
    pointerType: 'mouse'
  });

  firePointerEvent(svg, 'pointermove', {
    clientX: 25,
    clientY: 15,
    pointerType: 'mouse'
  });

  firePointerEvent(svg, 'pointermove', {
    clientX: 30,
    clientY: 30,
    pointerType: 'mouse'
  });

  firePointerEvent(svg, 'pointerup', {
    clientX: 30,
    clientY: 30,
    pointerType: 'mouse'
  });
}

describe('UI::eraser', function() {
  beforeEach(function() {
    svg = mockSVGContainer();
    svg.style.width = '100px';
    svg.style.height = '100px';
    document.body.appendChild(svg);
    text = mockTextAnnotation();
    svg.appendChild(text);

    deleteAnnotationSpy = sinon.spy();
    PDFJSAnnotate.__storeAdapter.deleteAnnotation = mockDeleteAnnotation(deleteAnnotationSpy);
    PDFJSAnnotate.__storeAdapter.getAnnotations = mockGetAnnotations();
  });

  afterEach(function() {
    if (svg.parentNode) {
      svg.parentNode.removeChild(svg);
    }

    disableEraser();
  });

  after(function() {
    PDFJSAnnotate.__storeAdapter.deleteAnnotation = __deleteAnnotation;
    PDFJSAnnotate.__storeAdapter.getAnnotations = __getAnnotations;
  });

  it('should do nothing when disabled', function(done) {
    enableEraser();
    disableEraser();
    simulateEraserMovement();
    setTimeout(function() {
      equal(deleteAnnotationSpy.called, false);
      done();
    }, 0);
  });

  it('should delete an annotation when enabled', function(done) {
    disableEraser();
    enableEraser();
    simulateEraserMovement();
    setTimeout(function() {
      equal(deleteAnnotationSpy.called, true);
      let args = deleteAnnotationSpy.getCall(0).args;
      equal(args[0], 'test-document-id');
      equal(args[1], text.getAttribute('data-pdf-annotate-id'));
      done();
    }, 0);
  });

  it('should delete annotation between pointermove points', function(done) {
    disableEraser();
    enableEraser();
    firePointerEvent(svg, 'pointerdown', {
      clientX: 0,
      clientY: 0,
      pointerType: 'mouse'
    });

    firePointerEvent(svg, 'pointermove', {
      clientX: 25,
      clientY: 20,
      pointerType: 'mouse'
    });

    firePointerEvent(svg, 'pointerup', {
      clientX: 25,
      clientY: 20,
      pointerType: 'mouse'
    });

    setTimeout(function() {
      equal(deleteAnnotationSpy.called, true);
      let args = deleteAnnotationSpy.getCall(0).args;
      equal(args[0], 'test-document-id');
      equal(args[1], text.getAttribute('data-pdf-annotate-id'));
      done();
    }, 0);
  });
});
