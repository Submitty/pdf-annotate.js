export default function() {
  return function (documentId, userId, pageNumber) {
    return Promise.resolve({
      documentId,
      userId,
      pageNumber,
      annotations: []
    });
  }
}
