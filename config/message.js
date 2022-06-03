// Messages for the authentication and profile settings
module.exports = {
  MESSAGE: {
    // Authorization
    INCORRECT_PASSWORD: {
      message: "Your password is not correct",
    },

    EMAIL_NOT_EXISTS: {
      message: "Email does not exists",
    },
    EMAIL_ALREADY_EXISTS: {
      message: "Email already exists",
    },

    LOGIN_SUCCESS: {
      message: "Login SuccessFull",
    },
    USER_PROFILE_GET: {
      message: "User profile fetched Successfully",
    },

    LOGOUT: {
      message: "Successfully logout.",
      status: 200,
    },
    // USER
    USER_REGISTERED: {
      message: "User has been registered successfully.",
    },

    // Bad Request or invalid data
    BAD_REQUEST: {
      message: "The request cannot be fulfilled due to bad syntax",
    },
    MISSING_FIELDS: {
      message: "Fields are missing",
    },
    // Report Error
    ERROR_FETCH_DATA: {
      message: "Error while fetching data from database",
    },
    CREATE_COMMENT:{
      message:"Comment has been generated successfully."
    }
  },
};
