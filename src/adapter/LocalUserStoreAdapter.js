import uuid from '../utils/uuid';
import StoreAdapter from './StoreAdapter';

// StoreAdapter for working with localStorage and associated user id
// This is ideal for testing, examples, and prototyping
export default class LocalUserStoreAdapter extends StoreAdapter {
  constructor(userId = 'user', globalEdit = false) {
    super({
      getAnnotations(documentId, pageNumber) {
        return new Promise((resolve, reject) => {
          let annotations = getAllAnnotations(documentId).filter((i) => {
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

    this._userId = userId;
    this._globalEdit = globalEdit;

    this.getAnnotation = (documentId, annotationId) => {
      return Promise.resolve(getAnnotations(documentId, this._userId)[findAnnotation(documentId, this._userId, annotationId)]);
    };

    this.addAnnotation = (documentId, pageNumber, annotation) => {
      return new Promise((resolve, reject) => {
        annotation.class = 'Annotation';
        annotation.uuid = uuid();
        annotation.page = pageNumber;
        annotation.userId = this._userId;

        let annotations = getAnnotations(documentId, this._userId);
        annotations.push(annotation);
        updateAnnotations(documentId, this._userId, annotations);

        resolve(annotation);
      });
    };

    this.editAnnotation = (documentId, annotationId, annotation) => {
      return new Promise((resolve, reject) => {
        if (!this._globalEdit && annotation.userId && annotation.userId !== this._userId) {
          reject('Non-matching userId');
        }
        let annotations = getAnnotations(documentId, annotation.userId);
        annotations[findAnnotation(documentId, annotation.userId, annotationId)] = annotation;
        updateAnnotations(documentId, annotation.userId, annotations);
        resolve(annotation);
      });
    };

    this.deleteAnnotation = (documentId, annotationId) => {
      return new Promise((resolve, reject) => {
        let annotation = getAllAnnotations(documentId).filter(i => i.uuid === annotationId)[0] || {};
        if (!annotation) {
          return reject('Could not find annotation');
        }
        else if (!this._globalEdit && annotation.userId && annotation.userId !== this._userId) {
          return reject('Non-matching userId');
        }
        let index = findAnnotation(documentId, annotation.userId, annotationId);
        if (index > -1) {
          let annotations = getAnnotations(documentId, annotation.userId);
          annotations.splice(index, 1);
          updateAnnotations(documentId, annotation.userId, annotations);
        }

        resolve(true);
      });
    };

    this.getComments = (documentId, annotationId) => {
      return new Promise((resolve, reject) => {
        resolve(getAnnotations(documentId, this._userId).filter((i) => {
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
          content: content,
          userId: this._userId
        };

        let annotations = getAnnotations(documentId, this._userId);
        annotations.push(comment);
        updateAnnotations(documentId, this._userId, annotations);

        resolve(comment);
      });
    };

    this.deleteComment = (documentId, commentId) => {
      return new Promise((resolve, reject) => {
        let comment = getAllAnnotations(documentId).filter(i => i.uuid === commentId)[0] || {};
        if (!comment) {
          return reject('Could not find annotation');
        }
        else if (!this._globalEdit && comment.userId && comment.userId !== this._userId) {
          return reject('Non-matching userId');
        }
        let index = -1;
        let annotations = getAnnotations(documentId, comment.userId);
        for (let i = 0, l = annotations.length; i < l; i++) {
          if (annotations[i].uuid === commentId) {
            index = i;
            break;
          }
        }

        if (index > -1) {
          annotations.splice(index, 1);
          updateAnnotations(documentId, comment.userId, annotations);
        }

        resolve(true);
      });
    };
  }

  get userId() {
    return this._userId;
  }
}

function getAllAnnotations(documentId) {
  let all_annotations = [];
  let re = new RegExp(`${documentId}/(.*)/annotations`);
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).search(re) > -1) {
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
  for (let i = 0, l = annotations.length; i < l; i++) {
    if (annotations[i].uuid === annotationId) {
      index = i;
      break;
    }
  }
  return index;
}
