const util = require("../utils/messages");
const _ = require("lodash");
const { MESSAGE } = require("../config/message");
const service = require("../utils/dbService");
const Post = require("../model/posts");
const User = require("../model/user");
module.exports = {
  // add userId while adding the authentication  middleware
  create: async (req, res) => {
    try {
      let data = req.body;
      data.userId = req.user._id;
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
        let following = req.user.following;
        let userData = await User.distinct("_id", { accountType: "public" });
        following = [req.user._id, ...following, ...userData];

        query = {
          userId: {
            $in: following,
          },
        };
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
  likeDislike: async (req, res) => {
    try {
      let id = req.body.postId;
      let userId = req.user._id;
      let actionType = req.body.action;
      if (actionType === 0) {
        await service.findOneAndUpdateDocument(
          Post,
          { _id: id },
          {
            $push: { likes: userId },
            $pull: {
              dislikes: userId,
            },
          }
        );
      } else if (actionType === 1) {
        await service.findOneAndUpdateDocument(
          Post,
          { _id: id },
          {
            $push: { dislikes: userId },
            $pull: {
              likes: userId,
            },
          }
        );
      }
      // if like then only dislike and does not increment dislike
      else if (actionType === 3) {
        await service.findOneAndUpdateDocument(
          Post,
          { _id: id },
          {
            $pull: {
              likes: userId,
            },
          }
        );
      }
      // if already dislikes then only dislikes and does not increase like
      else if (actionType === 4) {
        await service.findOneAndUpdateDocument(
          Post,
          { _id: id },
          {
            $pull: { dislikes: userId },
          }
        );
      }

      return util.successResponse({}, res);
    } catch (error) {
      console.error(error);
      return util.failureResponse(error, res);
    }
  },
};
