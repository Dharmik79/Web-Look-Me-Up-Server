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
    title: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: String,
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    // Description
    desc: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    comments: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
        comment: {
          type: String,
        },
        // Time of the comment
        at: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

schema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const user = mongoose.model("post", schema, "post");
module.exports = user;