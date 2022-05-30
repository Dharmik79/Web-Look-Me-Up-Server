const util = require("../utils/messages");
const _ = require("lodash");
const { MESSAGE } = require("../config/message");
const service = require("../utils/dbService");
const Post = require("../model/posts");
module.exports = {
  // add userId while adding the authentication  middleware
  create: async (req, res) => {
    try {
      let data = req.body;
      let result = await service.createDocument(Post, data);
      if (result) {
        return util.successResponse(result, res);
      }
      return util.failureResponse(MESSAGE.BAD_REQUEST, res);
    } catch (error) {
      console.error(error);
      return util.failureResponse(error, res);
    }
  },
  findAll: async (req, res) => {
    try {
      let { query, options } = req.body;
      if (!query) {
        query = {};
      }
      if (!options) {
        options = {};
      } 
      let result = await service.getAllDocuments(Post, query, options);
      if (result) {
        return util.successResponse(result, res);
      }
      return util.failureResponse(MESSAGE.BAD_REQUEST, res);
    } catch (error) {
      console.error(error);
      return util.failureResponse(error, res);
    }
  },
  get: async (req, res) => {
    try {
      let id = req.params.id;
      let result = await service.getSingleDocumentById(Post, id);
      if (result) {
        return util.successResponse(result, res);
      }
      return util.failureResponse(MESSAGE.BAD_REQUEST, res);
    } catch (error) {
      console.error(error);
      return util.failureResponse(error, res);
    }
  },
  update: async (req, res) => {
    try {
      let data = req.body;
      let id = req.params.id;
      let result = await service.findOneAndUpdateDocument(
        Post,
        { _id: id },
        data
      );
      if (result) {
        return util.successResponse(result, res);
      }
      return util.failureResponse(MESSAGE.BAD_REQUEST, res);
    } catch (error) {
      console.error(error);
      return util.failureResponse(error, res);
    }
  },
  delete: async (req, res) => {
    try {
      let id = req.params.id;
      let result = await service.findOneAndDeleteDocument(Post, {
        _id: id,
      });
      if (result) {
        return util.successResponse(result, res);
      }
      return util.failureResponse(MESSAGE.BAD_REQUEST, res);
    } catch (error) {
      console.error(error);
      return util.failureResponse(error, res);
    }
  },
};