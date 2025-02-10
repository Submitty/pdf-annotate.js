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
      return Promise.resolve(
        getAnnotations(documentId)[findAnnotation(documentId, annotationId)]
      );
    };

    this.addAnnotation = (documentId, pageNumber, annotation) => {
      return new Promise((resolve, reject) => {
        annotation.class = 'Annotation';
        annotation.uuid = uuid();
        annotation.page = pageNumber;

        let annotations = getAnnotations(documentId);
        annotations.push(annotation);
        updateAnnotations(documentId, annotations, this.history);

        resolve(annotation);
      });
    };

    this.editAnnotation = (documentId, annotationId, annotation) => {
      return new Promise((resolve, reject) => {
        let annotations = getAnnotations(documentId);
        annotations[findAnnotation(documentId, annotationId)] = annotation;
        updateAnnotations(documentId, annotations, this.history);
        resolve(annotation);
      });
    };

    this.deleteAnnotation = (documentId, annotationId) => {
      return new Promise((resolve, reject) => {
        let annotation =
          getAnnotations(documentId).filter(
            (i) => i.uuid === annotationId
          )[0] || {};
        if (!annotation) {
          return reject('Could not find annotation');
        }
        let index = findAnnotation(documentId, annotationId);
        if (index > -1) {
          let annotations = getAnnotations(documentId);
          annotations.splice(index, 1);
          updateAnnotations(documentId, annotations, this.history);
        }

        resolve(true);
      });
    };

    this.getComments = (documentId, annotationId) => {
      return new Promise((resolve, reject) => {
        resolve(
          getAnnotations(documentId).filter((i) => {
            return i.class === 'Comment' && i.annotation === annotationId;
          })
        );
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
        updateAnnotations(documentId, annotations, this.history);

        resolve(comment);
      });
    };

    this.deleteComment = (documentId, commentId) => {
      return new Promise((resolve, reject) => {
        let comment =
          getAnnotations(documentId).filter((i) => i.uuid === commentId)[0] ||
          {};
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
          updateAnnotations(documentId, annotations, this.history);
        }

        resolve(true);
      });
    };

    this.getAllAnnotations = (documentId) => {
      return new Promise((resolve, reject) => {
        let annotations = getAnnotations(documentId);
        resolve(annotations);
      });
    };

    this.undo = (documentId) => {
      return new Promise((resolve, reject) => {
        if (
          !this.history[documentId] ||
          this.history[documentId]['idx'] === 0
        ) {
          return reject('No history now.');
        }
        else {
          let idx = this.history[documentId]['idx'];
          console.log(idx);
          if (!this.history[documentId]['record'][idx - 1]) {
            return reject('invalid idx.');
          }
          else {
            let annotations = this.history[documentId]['record'][idx - 1];
            this.history[documentId]['idx'] = idx - 1;
            updateAnnotations(documentId, annotations);
            resolve(true);
          }
        }
      });
    };

    this.redo = (documentId) => {
      return new Promise((resolve, reject) => {
        if (!this.history[documentId]) {
          return reject('No history now.');
        }
        else {
          let idx = this.history[documentId]['idx'];
          console.log(idx);
          if (!this.history[documentId]['record'][idx + 1]) {
            return reject('invalid idx.');
          }
          else {
            let annotations = this.history[documentId]['record'][idx + 1];
            this.history[documentId]['idx'] = idx + 1;
            updateAnnotations(documentId, annotations);
            resolve(true);
          }
        }
      });
    };

    this.clearHistory = (documentId) => {
      return new Promise((resolve, reject) => {
        delete this.history[documentId];
        resolve(true);
      });
    };

    this.historyStatus = (documentId) => {
      // TODO: needs test!
      return new Promise((resolve, reject) => {
        let undo = false;
        let redo = false;
        let clear = false;

        let idx = null;
        if (this.history[documentId]) {
          idx = this.history[documentId]['idx'];
        }
        if (!this.history[documentId]) {
        }
        else {
          clear = true;
          if (this.history[documentId]['idx'] !== 0) {
            undo = true;
          }
          if (this.history[documentId]['record'].length > idx) {
            redo = true;
          }
        }
        resolve([undo, redo, clear]);
      });
    };
  }
}

function getAnnotations(documentId) {
  let json = localStorage.getItem(`${documentId}/annotations`);
  if (json === 'undefined') {
    json = '[]';
  }
  return JSON.parse(json) || [];
}

function updateAnnotations(documentId, annotations, history = null) {
  /* Requires be called at most only once in every function of StoreAdapter */
  /* As it records history every time it updates item (when history != null) */
  if (history) {
    if (!history[documentId]) {
      history[documentId] = {
        record: [getAnnotations(documentId)],
        idx: 0 // idx always points to annotation representing current status
      };
    }
    let idx = history[documentId]['idx'];
    history[documentId]['record'][idx + 1] = annotations;
    history[documentId]['idx'] = idx + 1;
    history[documentId]['record'].length = idx + 2;
    // console.log(history);
  }
  localStorage.setItem(
    `${documentId}/annotations`,
    JSON.stringify(annotations)
  );
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
