const User = require("../model/user");
const service = require("../utils/dbService");
const _ = require("lodash");
const { MESSAGE } = require(`../config/message`);
module.exports = {
  loginUser: async (email, password, req) => {
    try {
      email = email.toLowerCase();
      let user = await service.findUser(email);
      if (user) {
        req.userId = user.id;
        const isPasswordMatched = await user.isPasswordMatch(password);
        if (isPasswordMatched) {
          return user;
        } else {
          return false;
        }
      } else {
        throw MESSAGE.EMAIL_NOT_EXISTS.message;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  registration: async (body) => {
    try {
      body.email = body.email.toLowerCase();
      const user = await service.findUser(body.email);
      if (user) {
        throw MESSAGE.EMAIL_ALREADY_EXISTS.message;
      }
     
      let result = await service.createDocument(User, body);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
