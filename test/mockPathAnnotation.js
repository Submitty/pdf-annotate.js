import assign from 'object-assign';
import uuid from '../src/utils/uuid';
import renderPath from '../src/render/renderPath';

const DEFAULT_PATH_ANNOTATION = {
  color: '000',
  width: 1,
  lines: [[12, 10], [14, 12], [16, 14], [18, 16], [20, 18]]
};

export default function mockPathAnnotation(annotation) {
  let path = renderPath(assign(DEFAULT_PATH_ANNOTATION, annotation));
  path.setAttribute('data-pdf-annotate-id', uuid());
  path.setAttribute('data-pdf-annotate-type', 'drawing');
  return path;
};

export { DEFAULT_PATH_ANNOTATION };
