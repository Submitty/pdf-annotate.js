import setAttributes from '../utils/setAttributes';
import normalizeColor from '../utils/normalizeColor';

/**
 * Create SVGRectElements from an annotation definition.
 * This is used for annotations of type `circle`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGGElement|SVGCircleElement} A circle to be rendered
 */
export default function renderCircle(a) {
  let circle = createCircle(a);

  if (a.type === 'circle')
    setAttributes(circle, {
      stroke: normalizeColor(a.color || '#f00'),
      fill: 'none',
      'stroke-width': 5
    });
  if (a.type === 'emptycircle')
    setAttributes(circle, {
      stroke: normalizeColor(a.color || '#f00'),
      fill: 'none',
      'stroke-width': 2
    });

  if (a.type === 'fillcircle')
    setAttributes(circle, {
      stroke: normalizeColor(a.color || '#f00'),
      fill: '#f00',
      'stroke-width': 5
    });

  return circle;
}

function createCircle(r) {
  let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  setAttributes(circle, {
    cx: r.cx+15,
    cy: r.cy+15,
    r:30
  });

  return circle;
}
