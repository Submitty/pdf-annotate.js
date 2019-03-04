import uuid from '../utils/uuid';
import StoreAdapter from './StoreAdapter';

// StoreAdapter for working with localStorage
// This is ideal for testing, examples, and prototyping
export default class LocalStoreAdapter extends StoreAdapter {
  constructor(userId = "user") {
    super({
      getAnnotations(documentId, userId, pageNumber) {
        return new Promise((resolve, reject) => {
          let annotations = getAllAnnotations().filter((i) => {
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
          annotation.userId = userId;

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
            content: content,
            userId: userId
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
    this._userId = userId;
  }
  get userId(){
    return this._userId;
  }
}

function getAllAnnotations(){
  let all_annotations = [];
  for(let i = 0 ; i < localStorage.length; i++){
    if(localStorage.key(i).includes('annotations')){
      all_annotations.push(...JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
  }
  return all_annotations;
}

function getAnnotations(documentId, userId) {
  return JSON.parse(localStorage.getItem(`${documentId}/${userId}/annotations`)) || [];
}

function updateAnnotations(documentId, userId, annotations) {
  localStorage.setItem(`${documentId}/${userId}/annotations`, JSON.stringify(annotations));
}
/**
 *
 * @param {String} documentId Document id of the annotation
 * @param {String} userId User id of the annotation
 * @param {String} annotationId The id of the annotation
 *
 * This function finds all the annotation made by one user.
 *
 * @return {int} The index of the annotation in localstorage
 */
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
