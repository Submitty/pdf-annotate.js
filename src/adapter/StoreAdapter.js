import abstractFunction from '../utils/abstractFunction';
import { fireEvent } from '../UI/event';

// Adapter should never be invoked publicly
export default class StoreAdapter {
  /**
   * Create a new StoreAdapter instance
   *
   * @param {Object} [definition] The definition to use for overriding abstract methods
   */
  constructor(definition = {}) {
    // Copy each function from definition if it is a function we know about
    Object.keys(definition).forEach((key) => {
      if (typeof definition[key] === 'function' &&
          typeof this[key] === 'function') {
        this[key] = definition[key];
      }
    });
  }

  /**
   * Get all the annotations for a given document and page number.
   *
   * @param {String} documentId The ID for the document the annotations belong to
   * @param {String} userId The user makeing changes to this document
   * @param {Number} pageNumber The number of the page the annotations belong to
   * @return {Promise}
   */
  __getAnnotations(documentId, userId, pageNumber) { abstractFunction('getAnnotations'); }
  get getAnnotations() { return this.__getAnnotations; }
  set getAnnotations(fn) {
    this.__getAnnotations = function getAnnotations(documentId, userId, pageNumber) {
      return fn(...arguments).then((annotations) => {
        // TODO may be best to have this happen on the server
        if (annotations.annotations) {
          annotations.annotations.forEach((a) => {
            a.documentId = documentId;
          });
        }
        return annotations;
      });
    };
  }

  /**
   * Get the definition for a specific annotation.
   *
   * @param {String} documentId The ID for the document the annotation belongs to
   * @param {String} userId
   * @param {String} annotationId The ID for the annotation
   * @return {Promise}
   */
  getAnnotation(documentId, userId, annotationId) { abstractFunction('getAnnotation'); }

  /**
   * Add an annotation
   *
   * @param {String} documentId The ID for the document to add the annotation to
   * @param {String} userId The ID of the user
   * @param {String} pageNumber The page number to add the annotation to
   * @param {Object} annotation The definition for the new annotation
   * @return {Promise}
   */
  __addAnnotation(documentId, userId, pageNumber, annotation) { abstractFunction('addAnnotation'); }
  get addAnnotation() { return this.__addAnnotation; }
  set addAnnotation(fn) {
    this.__addAnnotation = function addAnnotation(documentId, userId, pageNumber, annotation) {
      return fn(...arguments).then((annotation) => {
        fireEvent('annotation:add', documentId, userId, pageNumber, annotation);
        return annotation;
      });
    };
  }

  /**
   * Edit an annotation
   *
   * @param {String} documentId The ID for the document
   * @param {String} userId The Id of the user
   * @param {String} pageNumber the page number of the annotation
   * @param {Object} annotation The definition of the modified annotation
   * @return {Promise}
   */
  __editAnnotation(documentId, userId, pageNumber, annotation) { abstractFunction('editAnnotation'); }
  get editAnnotation() { return this.__editAnnotation; }
  set editAnnotation(fn) {
    this.__editAnnotation = function editAnnotation(documentId, userId, annotationId, annotation) {
      return fn(...arguments).then((annotation) => {
        fireEvent('annotation:edit', documentId, userId, annotationId, annotation);
        return annotation;
      });
    };
  }

  /**
   * Delete an annotation
   *
   * @param {String} documentId The ID for the document
   * @param {String} userId
   * @param {String} annotationId The ID for the annotation
   * @return {Promise}
   */
  __deleteAnnotation(documentId, userId, annotationId) { abstractFunction('deleteAnnotation'); }
  get deleteAnnotation() { return this.__deleteAnnotation; }
  set deleteAnnotation(fn) {
    this.__deleteAnnotation = function deleteAnnotation(documentId, userId, annotationId) {
      return fn(...arguments).then((success) => {
        if (success) {
          fireEvent('annotation:delete', documentId, userId, annotationId);
        }
        return success;
      });
    };
  }

  /**
   * Get all the comments for an annotation
   *
   * @param {String} documentId The ID for the document
   * @param {String} userId
   * @param {String} annotationId The ID for the annotation
   * @return {Promise}
   */
  getComments(documentId, userId, annotationId) { abstractFunction('getComments'); }

  /**
   * Add a new comment
   *
   * @param {String} documentId The ID for the document
   * @param {String} userId
   * @param {String} annotationId The ID for the annotation
   * @param {Object} content The definition of the comment
   * @return {Promise}
   */
  __addComment(documentId, userId, annotationId, content) { abstractFunction('addComment'); }
  get addComment() { return this.__addComment; }
  set addComment(fn) {
    this.__addComment = function addComment(documentId, userId, annotationId, content) {
      return fn(...arguments).then((comment) => {
        fireEvent('comment:add', documentId, userId, annotationId, comment);
        return comment;
      });
    };
  }

  /**
   * Delete a comment
   *
   * @param {String} documentId The ID for the document
   * @param {String} userId
   * @param {String} commentId The ID for the comment
   * @return {Promise}
   */
  __deleteComment(documentId, userId, commentId) { abstractFunction('deleteComment'); }
  get deleteComment() { return this.__deleteComment; }
  set deleteComment(fn) {
    this.__deleteComment = function deleteComment(documentId, userId, commentId) {
      return fn(...arguments).then((success) => {
        if (success) {
          fireEvent('comment:delete', documentId, commentId);
        }
        return success;
      });
    };
  }
}
