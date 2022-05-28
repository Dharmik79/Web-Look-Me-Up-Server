
const createDocument = (model, data) =>
  new Promise((resolve, reject) => {
    model.create(data, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

const updateDocument = (model, id, data) =>
  new Promise((resolve, reject) => {
    model.updateOne(
      { _id: id },
      data,
      {
        runValidators: true,
        context: "query",
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });

const deleteDocument = (model, id) =>
  new Promise((resolve, reject) => {
    model.deleteOne({ _id: id }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const getAllDocuments = (model, query, options) =>
  new Promise((resolve, reject) => {
    model.paginate(query, options, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const getSingleDocumentById = (model, id, select = []) =>
  new Promise((resolve, reject) => {
    model.findOne({ _id: id }, select, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const countDocument = (model, where) =>
  new Promise((resolve, reject) => {
    model.where(where).countDocuments((err, result) => {
      if (result !== undefined) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });

const getDocumentByQuery = (model, where, select = []) =>
  new Promise((resolve, reject) => {
    model.findOne(where, select, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const findOneAndUpdateDocument = (model, filter, data, options = {}) =>
  new Promise((resolve, reject) => {
    model.findOneAndUpdate(filter, data, options, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

const findOneAndDeleteDocument = (model, filter, options = {}) =>
  new Promise((resolve, reject) => {
    model.findOneAndDelete(filter, options, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });



module.exports = {
  createDocument,
  getAllDocuments,
  updateDocument,
  deleteDocument,
  getSingleDocumentById,
  countDocument,
  getDocumentByQuery,
  findOneAndUpdateDocument,
  findOneAndDeleteDocument,
};
