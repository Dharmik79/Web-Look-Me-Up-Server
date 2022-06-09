const util = require("../utils/messages");
const _ = require("lodash");
const { MESSAGE } = require("../config/message");
const service = require("../utils/dbService");
const Post = require("../model/posts");
const User = require("../model/user");
module.exports = {
  update: async (req, res) => {
    try {
      let user = req.user;
      let data = req.body;
      let result = await service.findOneAndUpdateDocument(
        User,
        {
          _id: user._id,
        },
        data
      );
      if (result) {
        res.message = MESSAGE.UPDATE_USER.message;
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
      let result = await service.getSingleDocumentById(User, id);
      if (result) {
        res.message = MESSAGE.GET_USER.message;
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
      let result = await service.getAllDocuments(User, query, options);
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
