import uuid from '../src/utils/uuid';

export default (spy) => {
  return function (documentId, userId, pageNumber, annotation) {
    spy(documentId, userId, pageNumber, annotation);

    annotation.class = 'Annotation';
    annotation.uuid = uuid();
    annotation.page = pageNumber;
    annotation.userId = userId;

    return Promise.resolve(annotation);
  };
};
