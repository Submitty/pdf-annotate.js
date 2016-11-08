import setAttributes from '../utils/setAttributes';
import normalizeColor from '../utils/normalizeColor';

/**
 * Create SVGPathElement from an annotation definition.
 * This is used for anntations of type `drawing`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGPathElement} The path to be rendered
 */
export default function renderArrow(a) {
  let d = [];
  let arrow = document.createElementNS('http://www.w3.org/2000/svg', 'line');

  if (a.lines.length == 2) {
    var p1 = a.lines[0];
    var p2 = a.lines[a.lines.length - 1];

    setAttributes(arrow, {
      x1: p1[0],
      y1: p1[1],
      x2: p2[0],
      y2: p2[1],
      stroke: normalizeColor(a.color || '#000'),
      strokeWidth: a.width || 1,
      fill: '#000'
    });
  }

  return arrow;
}
