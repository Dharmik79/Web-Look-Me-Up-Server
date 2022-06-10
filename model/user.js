const mongoose = require("../config/db");
const mongoosePaginate = require("mongoose-paginate-v2");
var idValidator = require("mongoose-id-validator");
const bcrypt = require("bcrypt");

const myCustomLabels = {
  totalDocs: "itemCount",
  docs: "data",
  limit: "perPage",
  page: "currentPage",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "pageCount",
  pagingCounter: "slNo",
  meta: "paginator",
};
mongoosePaginate.paginate.options = {
  customLabels: myCustomLabels,
};
const Schema = mongoose.Schema;
const schema = new Schema(
  {
    fullName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    // dateOfBirth
    dob: {
      type: Date,
    },
    gender: {
      type: String,
    },
    followers: [String],
    following: [String],
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

// pre hooks methods for saving necessary data and pagination
schema.pre("save", async function (next) {
  if (this.firstName) {
    this.firstName =
      this.firstName.trim()[0].toUpperCase() +
      this.firstName.slice(1).toLowerCase();
  }
  if (this.lastName) {
    this.lastName =
      this.lastName.trim()[0].toUpperCase() +
      this.lastName.slice(1).toLowerCase();
  }
  this.fullName = this.firstName + " " + this.lastName;
  next();
});
schema.pre("findOneAndUpdate", async function (next) {
  let data = this.getUpdate();

  if (data.firstName || data.lastName) {
    let doc = await this.model.findOne(this.getFilter());
    if (data.firstName) {
      data.firstName =
        data.firstName.trim()[0].toUpperCase() +
        data.firstName.slice(1).toLowerCase();
    }
    if (data.lastName) {
      data.lastName =
        data.lastName.trim()[0].toUpperCase() +
        data.lastName.slice(1).toLowerCase();
    }

    data.fullName = (data.firstName ? data.firstName : doc.firstName).concat(
      " ",
      data.lastName ? data.lastName : doc.lastName
    );
  }
  next();
});
schema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return password === user.password;
};
schema.method("toJSON", function () {
  const { __v, password, ...object } = this.toObject();
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const user = mongoose.model("user", schema, "user");
module.exports = user;
