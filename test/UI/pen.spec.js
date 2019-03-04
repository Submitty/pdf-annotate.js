import { equal } from 'assert';
import PDFJSAnnotate from '../../src/PDFJSAnnotate';
import { firePointerEvent } from '../fireEvent';
import mockAddAnnotation from '../mockAddAnnotation';
import mockGetAnnotations from "../mockGetAnnotations";
import mockSVGContainer from '../mockSVGContainer';
import { setPen, enablePen, disablePen } from '../../src/UI/pen';

let svg;
let addAnnotationSpy;
let __addAnnotation = PDFJSAnnotate.__storeAdapter.addAnnotation;
let __getAnnotations = PDFJSAnnotate.__storeAdapter.getAnnotations;

function simulateCreateDrawingAnnotation(penSize, penColor) {
  setPen(penSize, penColor);

  firePointerEvent(svg, 'pointerdown', {
    clientX: 10,
    clientY: 10,
    pointerType: "mouse"
  });

  firePointerEvent(svg, 'pointermove', {
    clientX: 15,
    clientY: 15,
    pointerType: "mouse"
  });

  firePointerEvent(svg, 'pointermove', {
    clientX: 30,
    clientY: 30,
    pointerType: "mouse"
  });

  firePointerEvent(svg, 'pointerup', {
    clientX: 30,
    clientY: 30,
    pointerType: "mouse"
  });
}

describe('UI::pen', function () {
  beforeEach(function () {
    svg = mockSVGContainer();
    svg.style.width = '100px';
    svg.style.height = '100px';
    document.body.appendChild(svg);

    addAnnotationSpy = sinon.spy();
    PDFJSAnnotate.__storeAdapter.addAnnotation = mockAddAnnotation(addAnnotationSpy);
    PDFJSAnnotate.__storeAdapter.getAnnotations = mockGetAnnotations();
  });

  afterEach(function () {
    if (svg.parentNode) {
      svg.parentNode.removeChild(svg);
    }

    disablePen();
  });

  after(function () {
    PDFJSAnnotate.__storeAdapter.addAnnotation = __addAnnotation;
    PDFJSAnnotate.__storeAdapter.getAnnotations = __getAnnotations;
  });

  it('should do nothing when disabled', function (done) {
    enablePen();
    disablePen();
    simulateCreateDrawingAnnotation();
    setTimeout(function () {
      equal(addAnnotationSpy.called, false);
      done();
    }, 0);
  });

  it('should create an annotation when enabled', function (done) {
    disablePen();
    enablePen();
    simulateCreateDrawingAnnotation();
    setTimeout(function () {
      equal(addAnnotationSpy.called, true);
      let args = addAnnotationSpy.getCall(0).args;
      equal(args[0], 'test-document-id');
      equal(args[1], 'testUser');
      equal(args[2], '1');
      equal(args[3].type, 'drawing');
      equal(args[3].width, 1);
      equal(args[3].color, '000000');
      equal(args[3].lines.length, 2);
      done();
    }, 0);
  });
});
