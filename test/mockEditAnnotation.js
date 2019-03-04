export default (spy) => {
  return function (documentId, userId, annotationId, annotation) {
    spy(documentId, userId, annotationId, annotation);
    return Promise.resolve(annotation);
  };
}
