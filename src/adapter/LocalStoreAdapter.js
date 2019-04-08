import uuid from '../utils/uuid';
import StoreAdapter from './StoreAdapter';

// StoreAdapter for working with localStorage
// This is ideal for testing, examples, and prototyping
export default class LocalStoreAdapter extends StoreAdapter {
  constructor() {
    super({
      getAnnotations(documentId, pageNumber) {
        return new Promise((resolve, reject) => {
          let annotations = getAnnotations(documentId).filter((i) => {
            return i.page === pageNumber && i.class === 'Annotation';
          });

          resolve({
            documentId,
            pageNumber,
            annotations
          });
        });
      }
    });

    this.getAnnotation = (documentId, annotationId) => {
      return Promise.resolve(getAnnotations(documentId)[findAnnotation(documentId, annotationId)]);
    };

    this.addAnnotation = (documentId, pageNumber, annotation) => {
      return new Promise((resolve, reject) => {
        annotation.class = 'Annotation';
        annotation.uuid = uuid();
        annotation.page = pageNumber;

        let annotations = getAnnotations(documentId);
        annotations.push(annotation);
        updateAnnotations(documentId, annotations);

        resolve(annotation);
      });
    };

    this.editAnnotation = (documentId, annotationId, annotation) => {
      return new Promise((resolve, reject) => {
        let annotations = getAnnotations(documentId);
        annotations[findAnnotation(documentId, annotationId)] = annotation;
        updateAnnotations(documentId, annotations);
        resolve(annotation);
      });
    };

    this.deleteAnnotation = (documentId, annotationId) => {
      return new Promise((resolve, reject) => {
        let annotation = getAnnotations(documentId).filter(i => i.uuid === annotationId)[0] || {};
        if (!annotation) {
          return reject('Could not find annotation');
        }
        let index = findAnnotation(documentId, annotationId);
        if (index > -1) {
          let annotations = getAnnotations(documentId);
          annotations.splice(index, 1);
          updateAnnotations(documentId, annotations);
        }

        resolve(true);
      });
    };

    this.getComments = (documentId, annotationId) => {
      return new Promise((resolve, reject) => {
        resolve(getAnnotations(documentId).filter((i) => {
          return i.class === 'Comment' && i.annotation === annotationId;
        }));
      });
    };

    this.addComment = (documentId, annotationId, content) => {
      return new Promise((resolve, reject) => {
        let comment = {
          class: 'Comment',
          uuid: uuid(),
          annotation: annotationId,
          content: content
        };

        let annotations = getAnnotations(documentId);
        annotations.push(comment);
        updateAnnotations(documentId, annotations);

        resolve(comment);
      });
    };

    this.deleteComment = (documentId, commentId) => {
      return new Promise((resolve, reject) => {
        let comment = getAnnotations(documentId).filter(i => i.uuid === commentId)[0] || {};
        if (!comment) {
          return reject('Could not find annotation');
        }
        let index = -1;
        let annotations = getAnnotations(documentId);
        for (let i = 0, l = annotations.length; i < l; i++) {
          if (annotations[i].uuid === commentId) {
            index = i;
            break;
          }
        }

        if (index > -1) {
          annotations.splice(index, 1);
          updateAnnotations(documentId, annotations);
        }

        resolve(true);
      });
    };
  }
}

function getAnnotations(documentId) {
  return JSON.parse(localStorage.getItem(`${documentId}/annotations`)) || [];
}

function updateAnnotations(documentId, annotations) {
  localStorage.setItem(`${documentId}/annotations`, JSON.stringify(annotations));
}
/**
 *
 * @param {String} documentId Document id of the annotation
 * @param {String} annotationId The id of the annotation
 *
 * This function finds all the annotation made by one user.
 *
 * @return {int} The index of the annotation in localstorage
 */
function findAnnotation(documentId, annotationId) {
  let index = -1;
  let annotations = getAnnotations(documentId);
  for (let i = 0, l = annotations.length; i < l; i++) {
    if (annotations[i].uuid === annotationId) {
      index = i;
      break;
    }
  }
  return index;
}
