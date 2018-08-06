import uuid from '../utils/uuid';
import StoreAdapter from './StoreAdapter';

// StoreAdapter for working with localStorage
// This is ideal for testing, examples, and prototyping
export default class LocalStoreAdapter extends StoreAdapter {
  constructor(userId = "user") {
    super({
      getAnnotations(documentId, pageNumber) {
        return new Promise((resolve, reject) => {
          let annotations = getAnnotations(documentId, userId).filter((i) => {
            return i.page === pageNumber && i.class === 'Annotation';
          });

          resolve({
            documentId,
            pageNumber,
            annotations
          });
        });
      },

      getAnnotation(documentId, annotationId) {
        return Promise.resolve(getAnnotations(documentId, userId)[findAnnotation(documentId, annotationId)]);
      },

      addAnnotation(documentId, pageNumber, annotation) {
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

      editAnnotation(documentId, annotationId, annotation) {
        return new Promise((resolve, reject) => {
          let annotations = getAnnotations(documentId, userId);
          annotations[findAnnotation(documentId, annotationId)] = annotation;
          updateAnnotations(documentId, userId, annotations);

          resolve(annotation);
        });
      },

      deleteAnnotation(documentId, annotationId) {
        return new Promise((resolve, reject) => {
          let index = findAnnotation(documentId, annotationId);
          if (index > -1) {
            let annotations = getAnnotations(documentId, userId);
            annotations.splice(index, 1);
            updateAnnotations(documentId, userId, annotations);
          }

          resolve(true);
        });
      },

      getComments(documentId, annotationId) {
        return new Promise((resolve, reject) => {
          resolve(getAnnotations(documentId, userId).filter((i) => {
            return i.class === 'Comment' && i.annotation === annotationId;
          }));
        });
      },

      addComment(documentId, annotationId, content) {
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

      deleteComment(documentId, commentId) {
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
  let all_annotations = [];
  for(let i = 0 ; i < localStorage.length; i++){
    if(localStorage.key(i).includes('annotations')){
      all_annotations.push(...JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
  }
  return all_annotations;
}

function updateAnnotations(documentId, userId, annotations) {
  localStorage.setItem(`${documentId}/${userId}/annotations`, JSON.stringify(annotations));
}

function findAnnotation(documentId, annotationId) {
  let index = -1;
  let annotations = getAnnotations(documentId);
  for (let i=0, l=annotations.length; i<l; i++) {
    if (annotations[i].uuid === annotationId) {
      index = i;
      break;
    }
  }
  return index;
}
