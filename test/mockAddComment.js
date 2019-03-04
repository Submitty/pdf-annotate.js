import uuid from '../src/utils/uuid';

export default (spy) => {
  return function (documentId, userId, annotationId, content) {
    spy(documentId, userId, annotationId, content);

    let comment = {
      class: 'Comment',
      uuid: uuid(),
      annotation: annotationId,
      content: content,
      userId: userId
    };

    return Promise.resolve(comment);
  };
}
