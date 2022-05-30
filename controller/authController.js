const authService = require("../services/auth");
const util = require("../utils/messages");
const _ = require("lodash");
const { MESSAGE } = require("../config/message");
module.exports = {
  login: async (req, res) => {
    let { email, password } = req.body;
    try {
      email = email.toLowerCase();
      let result = await authService.loginUser(email, password, req);
      if (result) {
        return util.loginSuccess(result, res);
      } else {
        return util.loginFailed(MESSAGE.INCORRECT_PASSWORD, res);
      }
    } catch (error) {
      console.error("Error - login", error);
      return util.failureResponse(error, res);
    }
  },
  register: async (req, res) => {
    try {
      email = req.body.email.toLowerCase();
      let result = await authService.registration(req.body);
      return util.successResponse(result, res);
    } catch (error) {
      console.error("Error - register", error);
      return util.failureResponse(error, res);
    }
  },
};
