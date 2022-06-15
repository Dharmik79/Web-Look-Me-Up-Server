const responseStatusCode = require("./responseCode");
exports.successResponse = (data, res) => {
  return res.status(responseStatusCode.success).json({
    STATUS: "SUCCESS",
    MESSAGE: res.message
      ? res.message
      : "Your request is successfully executed",
    DATA: data,
  });
};

exports.updateProfileResponse = (data, res) => {
  return res.status(responseStatusCode.success).json({
    STATUS: "SUCCESS",
    MESSAGE: "Your profile is successfully updated",
    DATA: data,
  });
};
exports.failureResponse = (data, res) => {
  return res.status(responseStatusCode.validationError).json({
    DATA:data.data,
    STATUS: "FAILURE",
    MESSAGE: data.message
  });
};

exports.isDuplicate = (data, res) => {
  res.MESSAGE = "already exists";
  return res.status(responseStatusCode.validationError).json({
    STATUS: "FAILURE",
    MESSAGE: "already exists",
    DATA: data,
  });
};
exports.recordNotFound = (data, res) => {
  res.MESSAGE = "Record not found with specified criteria.";
  return res.status(responseStatusCode.validationError).json({
    STATUS: "FAILURE",
    MESSAGE: "Record not found with specified criteria.",
  });
};

exports.loginSuccess = (result, res) => {
  return res.status(responseStatusCode.success).json({
    STATUS: "SUCCESS",
    MESSAGE: "Welcome back to Look me Up",
    DATA: result,
  });
};

exports.loginFailed = (error, res) => {
  return res.status(responseStatusCode.validationError).json({
    STATUS: "FAILURE",
    MESSAGE: error.message,
    DATA:error.data
  });
};

exports.userNotFound = (res) => {
  res.MESSAGE = "User not found";
  return res.status(responseStatusCode.validationError).json({
    STATUS: "FAILURE",
    MESSAGE: "User not found",
  });
};

exports.logout = (res) => {
  return res.status(responseStatusCode.success).json({
    STATUS: "SUCCESS",
    MESSAGE: res.message ? res.message : "Logout Successful",
  });
};