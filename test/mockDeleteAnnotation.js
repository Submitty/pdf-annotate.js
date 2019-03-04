export default (spy) => {
  return function (documentId, userId, annotationId) {
    spy(documentId, userId, annotationId);
    return Promise.resolve(true);
  };
}
