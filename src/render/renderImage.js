import setAttributes from '../utils/setAttributes';

/**
 * Create SVGImageElement from an annotation definition.
 * This is used for anntations of type `image`. 
 *
 * @param {Object} a The annotation definition
 * @return {SVGImageElement} An image to be rendered
 */
export default function renderImage(a) {
  let image = createImage(a);
  setAttributes(image, {
    href: a.url,
  });

  return image;
}

function createImage(i) {
  let image = document.createElementNS('http://www.w3.org/2000/svg', 'image');

  setAttributes(image, {
    x: i.x,
    y: i.y,
    width: i.width,
    height: i.height
  });

  return image;
}
