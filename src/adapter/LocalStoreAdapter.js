import uuid from '../utils/uuid';
import StoreAdapter from './StoreAdapter';

// StoreAdapter for working with localStorage
// This is ideal for testing, examples, and prototyping
export default class LocalStoreAdapter extends StoreAdapter {
  constructor() {
    super({
      getAnnotations(documentId, userId, pageNumber) {
        return new Promise((resolve, reject) => {
          let annotations = getAnnotations(documentId, userId).filter((i) => {
            return i.page === pageNumber && i.class === 'Annotation';
          });

          resolve({
            documentId,
            userId,
            pageNumber,
            annotations
          });
        });
      },

      getAnnotation(documentId, userId, annotationId) {
        return Promise.resolve(getAnnotations(documentId, userId)[findAnnotation(documentId, userId, annotationId)]);
      },

      addAnnotation(documentId, userId, pageNumber, annotation) {
        return new Promise((resolve, reject) => {
          annotation.class = 'Annotation';
          annotation.uuid = uuid();
          annotation.page = pageNumber;

          let annotations = getAnnotations(documentId, userId);
          annotations.push(annotation);
          updateAnnotations(documentId, userId, annotations);

          resolve(annotation);
        });
      },

      editAnnotation(documentId, userId, annotationId, annotation) {
        return new Promise((resolve, reject) => {
          let annotations = getAnnotations(documentId, userId);
          annotations[findAnnotation(documentId, userId, annotationId)] = annotation;
          updateAnnotations(documentId, userId, annotations);

          resolve(annotation);
        });
      },

      deleteAnnotation(documentId, userId, annotationId) {
        return new Promise((resolve, reject) => {
          let index = findAnnotation(documentId, userId, annotationId);
          if (index > -1) {
            let annotations = getAnnotations(documentId, userId);
            annotations.splice(index, 1);
            updateAnnotations(documentId, userId, annotations);
          }

          resolve(true);
        });
      },

      getComments(documentId, userId, annotationId) {
        return new Promise((resolve, reject) => {
          resolve(getAnnotations(documentId, userId).filter((i) => {
            return i.class === 'Comment' && i.annotation === annotationId;
          }));
        });
      },

      addComment(documentId, userId, annotationId, content) {
        return new Promise((resolve, reject) => {
          let comment = {
            class: 'Comment',
            uuid: uuid(),
            annotation: annotationId,
            content: content
          };

          let annotations = getAnnotations(documentId, userId);
          annotations.push(comment);
          updateAnnotations(documentId, userId, annotations);

          resolve(comment);
        });
      },

      deleteComment(documentId, userId, commentId) {
        return new Promise((resolve, reject) => {
          getAnnotations(documentId, userId);
          let index = -1;
          let annotations = getAnnotations(documentId, userId);
          for (let i=0, l=annotations.length; i<l; i++) {
            if (annotations[i].uuid === commentId) {
              index = i;
              break;
            }
          }

          if (index > -1) {
            annotations.splice(index, 1);
            updateAnnotations(documentId, userId, annotations);
          }

          resolve(true);
        });
      }
    });
  }
}

function getAnnotations(documentId, userId) {
  return JSON.parse(localStorage.getItem(`${documentId}/${userId}/annotations`)) || [];
}
// Note, userId should not be an optional parameter, leaving it here for debugging purposes
function updateAnnotations(documentId, userId='bitdiddle', annotations) {
  localStorage.setItem(`${documentId}/${userId}/annotations`, JSON.stringify(annotations));
}

function findAnnotation(documentId, userId, annotationId) {
  let index = -1;
  let annotations = getAnnotations(documentId, userId);
  for (let i=0, l=annotations.length; i<l; i++) {
    if (annotations[i].uuid === annotationId) {
      index = i;
      break;
    }
  }
  return index;
}
