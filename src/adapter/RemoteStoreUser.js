import StoreAdapter from '@submitty/pdf-annotate.js/src/adapter/StoreAdapter'
import uuid from '@submitty/pdf-annotate.js/src/utils/uuid'
import axios from 'axios'
import {toast} from 'react-toastify'
import {BASE_URL} from '../../../../app/url'

export default class RemoteUserStoreAdapter extends StoreAdapter {
  constructor(userId = 'user', globalEdit = false) {
    super({
      getAnnotations(documentId, pageNumber) {
        return new Promise(async (resolve, reject) => {
          try {
            let annotations = await getAnnotations(documentId, userId)
            if (pageNumber)
              annotations = annotations.filter((i) => {
                return parseInt(i.page) === parseInt(pageNumber) && i.class === 'Annotation'
              })

            resolve({
              documentId,
              pageNumber,
              annotations,
            })
          } catch (err) {
            return reject(err)
          }
        })
      },
    })

    this._userId = userId
    this._globalEdit = globalEdit

    this.getAnnotation = (documentId, annotationId) => {
      return new Promise(async (resolve, reject) => {
        try {
          return resolve(
            (await getAnnotations(documentId, this._userId))[
              await findAnnotation(documentId, this._userId, annotationId)
            ]
          )
        } catch (err) {
          return reject(err)
        }
      })
    }

    this.removeUserAnnotations = (documentId, user_id) => {
      return new Promise(async (resolve, reject) => {
        await updateAnnotations(documentId, user_id, [], this.history)
        resolve(true)
      })
    }
    this.unpreviewSignAnnotations = (documentId, pageNumber) => {
      return new Promise(async (resolve, reject) => {
        let annotations = await getAnnotations(documentId, this._userId)
        annotations.forEach((annotation) => {
          if (pageNumber) {
            if (parseInt(annotation.page) !== parseInt(pageNumber)) {
              return annotation
            }
          }
          switch (annotation.annotation_type) {
            case 'time':
              annotation.type = 'area'
              break
            default:
              annotation.type = 'area'
          }
        })
        localStorage.setItem(
          `${documentId}/${this._userId}/annotations`,
          JSON.stringify(Array.isArray(annotations) ? annotations : [annotations])
        )
        resolve(annotations)
      })
    }
    this.previewSignAnnotations = (documentId, signature, pageNumber) => {
      return new Promise(async (resolve, reject) => {
        let annotations = await getAnnotations(documentId, this._userId)
        await annotations.map(async (annotation) => {
          if (pageNumber) {
            if (parseInt(annotation.page) !== parseInt(pageNumber)) {
              return annotation
            }
          }
          switch (annotation.annotation_type) {
            case 'time':
              annotation.type = 'textbox'
              annotation.content = new Date().toUTCString()
              break
            default:
              annotation.type = 'image'
              annotation.url = signature
          }
        })
        localStorage.setItem(
          `${documentId}/${this._userId}/annotations`,
          JSON.stringify(Array.isArray(annotations) ? annotations : [annotations])
        )
        resolve(annotations)
      })
    }

    this.signCurrentUserAnnotations = (documentId, signature) => {
      return new Promise(async (resolve, reject) => {
        let annotations = await getAnnotations(documentId, this._userId)
        annotations.forEach((annotation) => {
          switch (annotation.annotation_type) {
            case 'time':
              annotation.type = 'textbox'
              annotation.content = new Date().toUTCString()
              break
            default:
              annotation.type = 'image'
              annotation.url = signature
          }
        })
        await updateAnnotations(documentId, this._userId, annotations, this.history)
        resolve(true)
      })
    }

    this.resetAnnotations = (documentId) => {
      return new Promise(async (resolve, reject) => {
        await updateAnnotations(documentId, this._userId, [], this.history)
        resolve(true)
      })
    }

    this.addAnnotation = (documentId, pageNumber, annotation) => {
      return new Promise(async (resolve, reject) => {
        annotation.class = 'Annotation'
        annotation.uuid = uuid()
        annotation.page = pageNumber
        annotation.userId = this._userId

        let annotations = await getAnnotations(documentId, this._userId)
        annotations.push(annotation)
        await updateAnnotations(documentId, this._userId, annotations, this.history)

        resolve(annotation)
      })
    }

    this.editAnnotation = (documentId, annotationId, annotation) => {
      return new Promise(async (resolve, reject) => {
        if (!this._globalEdit && annotation.userId && annotation.userId !== this._userId) {
          reject('Non-matching userId')
        }
        let annotations = await getAnnotations(documentId, annotation.userId)
        annotations[await findAnnotation(documentId, annotation.userId, annotationId)] = annotation
        await updateAnnotations(documentId, annotation.userId, annotations, this.history)
        resolve(annotation)
      })
    }

    this.deleteAnnotation = (documentId, annotationId) => {
      return new Promise(async (resolve, reject) => {
        let annotation =
          (await getAllAnnotations(documentId)).filter((i) => i.uuid === annotationId)[0] || {}
        if (!annotation) {
          return reject('Could not find annotation')
        } else if (!this._globalEdit && annotation.userId && annotation.userId !== this._userId) {
          return reject('Non-matching userId')
        }
        let index = await findAnnotation(documentId, annotation.userId, annotationId)
        if (index > -1) {
          let annotations = await getAnnotations(documentId, annotation.userId)
          annotations.splice(index, 1)
          await updateAnnotations(documentId, annotation.userId, annotations, this.history)
        }

        resolve(true)
      })
    }

    this.getComments = (documentId, annotationId) => {
      return new Promise(async (resolve, reject) => {
        resolve(
          (await getAnnotations(documentId, this._userId)).filter((i) => {
            return i.class === 'Comment' && i.annotation === annotationId
          })
        )
      })
    }

    this.addComment = (documentId, annotationId, content) => {
      return new Promise(async (resolve, reject) => {
        let comment = {
          class: 'Comment',
          uuid: uuid(),
          annotation: annotationId,
          content: content,
          userId: this._userId,
        }

        let annotations = await getAnnotations(documentId, this._userId)
        annotations.push(comment)
        await updateAnnotations(documentId, this._userId, annotations, this.history)

        resolve(comment)
      })
    }

    this.deleteComment = (documentId, commentId) => {
      return new Promise(async (resolve, reject) => {
        let comment =
          (await getAllAnnotations(documentId)).filter((i) => i.uuid === commentId)[0] || {}
        if (!comment) {
          return reject('Could not find annotation')
        } else if (!this._globalEdit && comment.userId && comment.userId !== this._userId) {
          return reject('Non-matching userId')
        }
        let index = -1
        let annotations = await getAnnotations(documentId, comment.userId)
        for (let i = 0, l = annotations.length; i < l; i++) {
          if (annotations[i].uuid === commentId) {
            index = i
            break
          }
        }

        if (index > -1) {
          annotations.splice(index, 1)
          await updateAnnotations(documentId, comment.userId, annotations, this.history)
        }

        resolve(true)
      })
    }

    this.undo = async (documentId) => {
      if (
        !this.history[documentId] ||
        !this.history[documentId][this._userId] ||
        this.history[documentId][this._userId]['idx'] === 0
      ) {
        // return reject('No history now.');
        toast.error('No history now.')
      } else {
        let idx = this.history[documentId][this._userId]['idx']
        if (!this.history[documentId][this._userId]['record'][idx - 1]) {
          // return reject('invalid idx.');
          toast.error('No history now.')
        } else {
          let annotations = this.history[documentId][this._userId]['record'][idx - 1]
          this.history[documentId][this._userId]['idx'] = idx - 1
          await updateAnnotations(documentId, this._userId, annotations)
          // resolve(true);
          return true
        }
      }
    }

    this.redo = async (documentId) => {
      if (!this.history[documentId][this._userId]) {
        // return reject('No history now.');
        throw new Error('No history now.')
      } else {
        let idx = this.history[documentId][this._userId]['idx']
        if (!this.history[documentId][this._userId]['record'][idx + 1]) {
          // return reject('invalid idx.');
          toast.error('No history now.')
        } else {
          let annotations = this.history[documentId][this._userId]['record'][idx + 1]
          this.history[documentId][this._userId]['idx'] = idx + 1
          await updateAnnotations(documentId, this._userId, annotations)
          // resolve(true);
          return true
        }
      }
    }

    this.clearHistory = (documentId) => {
      return new Promise((resolve, reject) => {
        delete this.history[documentId][this._userId]
        resolve(true)
      })
    }

    this.historyStatus = (documentId) => {
      // TODO: needs test!
      // return new Promise((resolve, reject) => {
      let undo = false
      let redo = false
      let clear = false
      let idx = null
      if (!this.history[documentId]) {
        return [undo, redo, clear]
      }
      if (this.history?.[documentId]?.[this._userId]) {
        idx = this.history[documentId][this._userId]['idx']
      }
      if (!this.history[documentId][this._userId]) {
        return [undo, redo, clear]
      } else {
        clear = true
        if (this.history[documentId][this._userId]['idx'] !== 0) {
          undo = true
        }
        if (this.history[documentId][this._userId]['record'].length > idx + 1) {
          redo = true
        }
      }
      return [undo, redo, clear]
    }
  }

  get userId() {
    return this._userId
  }
}

export async function getAllAnnotations(documentId) {
  let all_annotations = []
  let annotationsFound = false
  let re = new RegExp(`${documentId}/(.*)/annotations`)
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).search(re) > -1) {
      annotationsFound = true
      all_annotations.push(...JSON.parse(localStorage.getItem(localStorage.key(i))))
    }
  }
  if (!annotationsFound) {
    let annotationResponse = await axios.get(
      `${BASE_URL}/program/library/annotations/${documentId}`
    )
    if (annotationResponse.status === 200) {
      all_annotations = annotationResponse.data.data.map((d) => JSON.parse(d.annotations))
    }
    // Save all annotations to local storage
    all_annotations.forEach((annotation) => {
      localStorage.setItem(
        `${documentId}/${annotation.userId}/annotations`,
        JSON.stringify(Array.isArray(annotation) ? annotation : [annotation])
      )
    })
  }

  return all_annotations
}

export async function getAnnotations(documentId, userId, pageNumber) {
  let annotations = JSON.parse(localStorage.getItem(`${documentId}/${userId}/annotations`))
  if (!annotations) {
    let annotationResponse = await axios.get(
      `${BASE_URL}/program/library/annotations/${documentId}?team_member_id=${userId}`
    )
    if (annotationResponse.status === 200) {
      annotations = annotationResponse.data.data.map((d) => JSON.parse(d.annotations)).flat()
    }
    annotations = Array.isArray(annotations) ? annotations : [annotations]
    localStorage.setItem(`${documentId}/${userId}/annotations`, JSON.stringify(annotations))
  }
  if (pageNumber) {
    annotations = annotations.filter((i) => {
      return parseInt(i.page) === parseInt(pageNumber) && i.class === 'Annotation'
    })
  }
  return annotations
}

export async function updateAnnotations(documentId, userId, annotations, history) {
  /* Requires be called at most only once in every function of StoreAdapter */
  /* As it records history every time it updates item (when history != null) */
  if (history) {
    if (!history?.[documentId]?.[userId]) {
      let _ = {
        record: [await getAnnotations(documentId, userId)],
        idx: 0, // idx always points to annotation representing current status
      }
      if (!history[documentId]) {
        history[documentId] = {}
      }
      history[documentId][userId] = _
    }
    let idx = history[documentId][userId]['idx']
    history[documentId][userId]['record'][idx + 1] = annotations
    history[documentId][userId]['idx'] = idx + 1
    history[documentId][userId]['record'].length = idx + 2
  }
  localStorage.setItem(
    `${documentId}/${userId}/annotations`,
    JSON.stringify(Array.isArray(annotations) ? annotations : [annotations])
  )
  await axios.post(`${BASE_URL}/program/library/annotations`, {
    node_id: documentId,
    team_member_id: userId,
    annotations: JSON.stringify(Array.isArray(annotations) ? annotations : [annotations]),
  })
}
/**
 *
 * @param {String} documentId Document id of the annotation
 * @param {String} userId User id of the annotation
 * @param {String} annotationId The id of the annotation
 *
 * This function finds all the annotation made by one user.
 *
 * @return {Promise<number>} The index of the annotation in localstorage
 */
export async function findAnnotation(documentId, userId, annotationId) {
  let index = -1
  let annotations = await getAnnotations(documentId, userId)
  for (let i = 0, l = annotations.length; i < l; i++) {
    if (annotations[i].uuid === annotationId) {
      index = i
      break
    }
  }
  return index
}
