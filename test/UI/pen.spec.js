import { equal, deepStrictEqual } from 'assert';
import PDFJSAnnotate from '../../src/PDFJSAnnotate';
import { firePointerEvent } from '../fireEvent';
import mockAddAnnotation from '../mockAddAnnotation';
import mockGetAnnotations from '../mockGetAnnotations';
import mockSVGContainer from '../mockSVGContainer';
import { setPen, getPen, enablePen, disablePen } from '../../src/UI/pen';

let svg;
let addAnnotationSpy;
let __addAnnotation = PDFJSAnnotate.__storeAdapter.addAnnotation;
let __getAnnotations = PDFJSAnnotate.__storeAdapter.getAnnotations;

function simulateCreateDrawingAnnotation() {
  setPen();

  firePointerEvent(svg, 'pointerdown', {
    clientX: 10,
    clientY: 10,
    pointerType: 'mouse'
  });

  firePointerEvent(svg, 'pointermove', {
    clientX: 15,
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

describe('UI::pen', function() {
  beforeEach(function() {
    svg = mockSVGContainer();
    svg.style.width = '100px';
    svg.style.height = '100px';
    document.body.appendChild(svg);

    addAnnotationSpy = sinon.spy();
    PDFJSAnnotate.__storeAdapter.addAnnotation = mockAddAnnotation(addAnnotationSpy);
    PDFJSAnnotate.__storeAdapter.getAnnotations = mockGetAnnotations();
  });

  afterEach(function() {
    if (svg.parentNode) {
      svg.parentNode.removeChild(svg);
    }

    disablePen();
  });

  after(function() {
    PDFJSAnnotate.__storeAdapter.addAnnotation = __addAnnotation;
    PDFJSAnnotate.__storeAdapter.getAnnotations = __getAnnotations;
  });

  it('should do nothing when disabled', function(done) {
    enablePen();
    disablePen();
    simulateCreateDrawingAnnotation();
    setTimeout(function() {
      equal(addAnnotationSpy.called, false);
      done();
    }, 0);
  });

  it('should create an annotation when enabled', function(done) {
    disablePen();
    enablePen();
    simulateCreateDrawingAnnotation();
    setTimeout(function() {
      equal(addAnnotationSpy.called, true);
      let args = addAnnotationSpy.getCall(0).args;
      equal(args[0], 'test-document-id');
      equal(args[1], '1');
      equal(args[2].type, 'drawing');
      equal(args[2].width, 1);
      equal(args[2].color, '000000');
      equal(args[2].lines.length, 2);
      done();
    }, 0);
  });

  it('allow floating point pen size', () => {
    setPen(0.1);
    deepStrictEqual(getPen(), {size: 0.1, color: '000000'});
  });

  it('round floating point pen size to 2 decimal points', () => {
    setPen(0.123456);
    deepStrictEqual(getPen(), {size: 0.12, color: '000000'});
  });

  it('parseFloat run on penSize', () => {
    setPen('0.12');
    deepStrictEqual(getPen(), {size: 0.12, color: '000000'});
  });
});
