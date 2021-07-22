import setAttributes from '../utils/setAttributes';
import normalizeColor from '../utils/normalizeColor';

/**
 * Wrap each line of given text in a `<tspan>` element and append these
 * lines to the given SVGTextElement
 *
 * @param {SVGTextElement} textElement A text element to hold the split text
 * @param {String} textContent String to render with line breaks
 */
function insertLineBreaks(textElement, textContent) {
  const lines = (textContent || '').split('\n');
  // can't use dy attribute here since we want empty lines to take up space as well,
  // so we will update y manually based on font size
  const x = textElement.getAttribute('x');
  let y = Number(textElement.getAttribute('y'));
  const size = Number(textElement.getAttribute('font-size'));
  for (const line of lines) {
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspan.setAttribute('y', y.toString());
    tspan.setAttribute('x', x);
    tspan.innerHTML = line;
    textElement.appendChild(tspan);

    y += size;
  }
}

/**
 * Create SVGTextElement from an annotation definition.
 * This is used for anntations of type `textbox`.
 *
 * @param {Object} a The annotation definition
 * @return {SVGTextElement} A text to be rendered
 */
export default function renderText(a) {
  // Text should be rendered at 0 degrees relative to
  // document rotation
  let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  setAttributes(text, {
    x: a.x,
    y: a.y,
    fill: normalizeColor(a.color || '#000'),
    fontSize: a.size,
    transform: `rotate(${a.rotation})`,
    style: 'white-space: pre'
  });

  insertLineBreaks(text, a.content);

  let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.appendChild(text);

  return g;
}
