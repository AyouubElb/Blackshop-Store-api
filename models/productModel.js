const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    comparePrice: {
      type: Number,
      required: true,
    },
    images: [
      {
        color: {
          type: String,
          require: true,
        },
        file: {
          type: String,
          require: true,
        },
        cloudinary_id: {
          type: String,
          required: true,
        },
      },
    ],
    sizes: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    relativeProducts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        // required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
