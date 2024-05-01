const mongoose = require("mongoose");

const pageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      minlength: 3,
      maxlength: 50,
      unique: true,
    },
    slug: {
      type: String,
      // required: true,
      minlength: 3,
      maxlength: 50,
      // unique: true,
    },
    description: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", pageSchema);
