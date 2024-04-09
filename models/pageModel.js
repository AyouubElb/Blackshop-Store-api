const mongoose = require("mongoose");

const pageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 3,
      maxlength: 50,
      unique: true,
    },
    slug: {
      type: String,
      require: true,
      minlength: 3,
      maxlength: 25,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", pageSchema);
