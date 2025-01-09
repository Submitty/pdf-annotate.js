import StoreAdapter from '@submitty/pdf-annotate.js/src/adapter/StoreAdapter';
import uuid from '@submitty/pdf-annotate.js/src/utils/uuid';
import axios from 'axios';
import { BASE_URL } from '../../../../app/url';

// StoreAdapter for working with localStorage
// This is ideal for testing, examples, and prototyping
export default class RemoteStoreAdapter extends StoreAdapter {
  constructor() {
    super({
      getAnnotations(documentId, pageNumber) {
        return new Promise(async (resolve, reject) => {
          try {
          let annotations = (await getAnnotations(documentId));
          annotations = annotations.filter((i) => {
            return parseInt(i.page) === parseInt(pageNumber) && i.class === 'Annotation';
          });

          resolve({
            documentId,
            pageNumber,
            annotations
          });
        } catch (err) {
          return reject(err);
        }
        });
      }
    });

    this.getAnnotation = (documentId, annotationId) => {
      return new Promise(async (resolve, reject) => {
        try {
          return resolve((await getAnnotations(documentId))[await findAnnotation(documentId, annotationId)]);
        } catch (err) {
          return reject(err);
        }
      });
    };

    this.addAnnotation = (documentId, pageNumber, annotation) => {
      return new Promise(async (resolve, reject) => {
        annotation.class = 'Annotation';
        annotation.uuid = uuid();
        annotation.page = pageNumber;

        let annotations = await getAnnotations(documentId);
        annotations.push(annotation);
        updateAnnotations(documentId, annotations);

        resolve(annotation);
      });
    };

    this.editAnnotation = (documentId, annotationId, annotation) => {
      return new Promise(async (resolve, reject) => {
        let annotations = await getAnnotations(documentId);
        annotations[await findAnnotation(documentId, annotationId)] = annotation;
        updateAnnotations(documentId, annotations);
        resolve(annotation);
      });
    };

    this.deleteAnnotation = (documentId, annotationId) => {
      return new Promise(async (resolve, reject) => {
        let annotation = (await getAnnotations(documentId)).filter(i => i.uuid === annotationId)[0] || {};
        if (!annotation) {
          return reject('Could not find annotation');
        }
        let index = await findAnnotation(documentId, annotationId);
        if (index > -1) {
          let annotations = await getAnnotations(documentId);
          annotations.splice(index, 1);
          updateAnnotations(documentId, annotations);
        }

        resolve(true);
      });
    };

    this.getComments = (documentId, annotationId) => {
      return new Promise(async (resolve, reject) => {
        resolve((await getAnnotations(documentId)).filter((i) => {
          return i.class === 'Comment' && i.annotation === annotationId;
        }));
      });
    };

    this.addComment = (documentId, annotationId, content) => {
      return new Promise(async (resolve, reject) => {
        let comment = {
          class: 'Comment',
          uuid: uuid(),
          annotation: annotationId,
          content: content
        };

        let annotations = await getAnnotations(documentId);
        annotations.push(comment);
        updateAnnotations(documentId, annotations);

        resolve(comment);
      });
    };

    this.deleteComment = (documentId, commentId) => {
      return new Promise(async (resolve, reject) => {
        let comment = (await getAnnotations(documentId)).filter(i => i.uuid === commentId)[0] || {};
        if (!comment) {
          return reject('Could not find annotation');
        }
        let index = -1;
        let annotations = await getAnnotations(documentId);
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

export async function getAnnotations(documentId, pageNumber) {
  let annotations = [];
  let annotationsFound = false;
  let re = new RegExp(`${documentId}/(.*)/annotations`);
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).search(re) > -1) {
      annotationsFound = true;
      const annotation = localStorage.getItem(localStorage.key(i))
      annotations.push(...JSON.parse(annotation));
    }
  }
  if (!annotationsFound) {
    let annotationResponse = await axios.get(`${BASE_URL}/program/library/annotations/${documentId}`);
    if (annotationResponse.status === 200) {
      annotations = annotationResponse.data.data.map(d => JSON.parse(d.annotations)).flat();
    }
    annotations = Array.isArray(annotations) ? annotations : [annotations];
    let user_annotations = annotationResponse.data.data.reduce((acc, curr) => {
      let tm_annotations = acc[curr.team_member_id];
      if (tm_annotations) {
        tm_annotations.push(JSON.parse(curr.annotations));
      }
      else
       acc[curr.team_member_id] = JSON.parse(curr.annotations);
      return acc;
    }, {})
    for (const ua of Object.keys(user_annotations)) {
      localStorage.setItem(`${documentId}/${ua}/annotations`, JSON.stringify(user_annotations[ua]));
    }
  }
  if (pageNumber) {
    annotations = annotations.filter((i) => {
      return parseInt(i.page) === parseInt(pageNumber) && i.class === 'Annotation';
    });
  }
  return annotations;
}

export async function updateAnnotations(documentId, annotations) {
  // NOTE: we will not update annotations when user is not selected.
  // localStorage.setItem(`${documentId}/annotations`, JSON.stringify(annotations));
}

/**
 *
 * @param {String} documentId Document id of the annotation
 * @param {String} annotationId The id of the annotation
 *
 * This function finds all the annotation made by one user.
 *
 * @return {Promise<number>} The index of the annotation in localstorage
 */
export async function findAnnotation(documentId, annotationId) {
  let index = -1;
  let annotations = await getAnnotations(documentId);
  for (let i = 0, l = annotations.length; i < l; i++) {
    if (annotations[i].uuid === annotationId) {
      index = i;
      break;
    }
  }
  return index;
}