const user = require("../model/user");
const createDocument = (model, data) =>
  new Promise((resolve, reject) => {
    model.create(data, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
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

const findUser = async (email) => {
  const findUser = await user.findOne({
    email: email,
  });
  return findUser;
};

module.exports = {
  createDocument,
  getAllDocuments,
  deleteDocument,
  getSingleDocumentById,
  countDocument,
  getDocumentByQuery,
  findOneAndUpdateDocument,
  findOneAndDeleteDocument,
  findUser,
};
