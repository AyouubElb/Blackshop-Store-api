const mongoose = require("mongoose");

const menuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 3,
      maxlength: 50,
      unique: true,
    },
    links: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Page",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
