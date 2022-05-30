const User = require("../model/user");
const service = require("../utils/dbService");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { JWT } = require("../config/authConstant");
const { MESSAGE } = require(`../config/message`);
async function generateToken(id, email, secret) {
  return jwt.sign(
    {
      id: id,
      email: email,
    },
    secret,
    {
      expiresIn: JWT.EXPIRES_IN * 60,
    }
  );
}

module.exports = {
  loginUser: async (email, password, req) => {
    try {
      email = email.toLowerCase();
      let user = await service.findUser(email);
      if (user) {
        const isPasswordMatched = await user.isPasswordMatch(password);
        if (isPasswordMatched) {
          user = user.toJSON();
          user.token = await generateToken(user._id, email, JWT.SECRET);
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
