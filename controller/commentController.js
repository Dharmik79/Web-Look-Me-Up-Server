const util = require("../utils/messages");
const _ = require("lodash");
const { MESSAGE } = require("../config/message");
const service = require("../utils/dbService");
const Post = require("../model/posts");
module.exports = {
  create: async (req, res) => {
    try {
      let {comment,postId} = req.body;
      let data={
        $push:{
          "comments":{
            userId:req.user._id,
            comment:comment,
            at:Date.now()
          }
        }
      }
      let result = await service.findOneAndUpdateDocument(
        Post,
        { _id: postId },
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
};
