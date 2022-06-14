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
  suggestions: async (req, res) => {
    try {
      let user = req.user;
      let { options } = req.body;

      if (!options) {
        options = {};
      }
      user.following = [...user.following, user._id];
      let result = await service.getAllDocuments(
        User,
        {
          _id: {
            $nin: user.following,
          },
        },
        options
      );

      return util.successResponse(result, res);
    } catch (error) {
      console.error(error);
      return util.failureResponse(error, res);
    }
  },
  friends: async (req, res) => {
    try {
      let {query, options } = req.body;
      if (!query) {
        query = {
          _id: req.user._id,
        };
      }

      let searchValue=""
      if(query.searchValue)
      {
        searchValue=query.searchValue
        delete query.searchValue
      }

      if (!options) {
        options = {};
      }
      let user = await service.getSingleDocumentById(User,query);
      let result = await service.getAllDocuments(
        User,
        {
          _id: {
            $in: user.following,
          },
          fullName:{
            $regex:searchValue,
            $options:"i"
          }
        },
        options
      );
      return util.successResponse(result, res);
    } catch (error) {
      console.error(error);
      return util.failureResponse(error, res);
    }
  },
  followFriend: async (req, res) => {
    try {
      let user = req.user;
      let body = req.body;
      await service.findOneAndUpdateDocument(
        User,
        { _id: user._id },
        { $addToSet: { following: body.followingId } },
        { new: true }
      );
      await service.findOneAndUpdateDocument(
        User,
        { _id: body.followingId },
        { $addToSet: { followers: user._id } },
        { new: true }
      );
      return util.successResponse({}, res);
    } catch (error) {
      console.error(error);
      return util.failureResponse(error, res);
    }
  },
  followers: async (req, res) => {
    try {
      let { query, options } = req.body;
      if (!query) {
        query = {
          _id: req.user._id,
        };
      }

      if (!options) {
        options = {};
      }
      let user = await service.getSingleDocumentById(User,query);
      let result = await service.getAllDocuments(
        User,
        {
          _id: {
            $in: user.followers,
          },
        },

        options
      );

      return util.successResponse(result, res);
    } catch (error) {
      console.error(error);
      return util.failureResponse(error, res);
    }
  },
  unFollowFriend: async (req, res) => {
    try {
      let user = req.user;
      let body = req.body;
      await service.findOneAndUpdateDocument(
        User,
        { _id: user._id },
        { $pull: { following: body.followingId } },
        { new: true }
      );
      await service.findOneAndUpdateDocument(
        User,
        { _id: body.followingId },
        { $pull: { followers: user._id } },
        { new: true }
      );
      return util.successResponse({}, res);
    } catch (error) {
      console.error(error);
      return util.failureResponse(error, res);
    }
  },
};
