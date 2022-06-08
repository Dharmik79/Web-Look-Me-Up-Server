const util = require("../utils/messages");
const _ = require("lodash");
const { MESSAGE } = require("../config/message");
const service = require("../utils/dbService");
const Post = require("../model/posts");
module.exports = {
  update: async (req, res) => {
    try {
      let user = req.user;
      let data=req.body
      let result = await service.findOneAndUpdateDocument(Post, {
        _id: user._id,
      },data);
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
};
