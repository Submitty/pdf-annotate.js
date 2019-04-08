export default function() {
  return function(documentId, pageNumber) {
    return Promise.resolve({
      documentId,
      pageNumber,
      annotations: []
    });
  };
};
