const productModel = require("../models/productModel");
const fs = require("fs");
const mongoose = require("mongoose");

exports.allProducts = (req, res) => {
  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let order = req.query.order ? req.query.order : "asc";
    let limit = req.query.limit ? parseInt(req.query.limit) : 40;
    let search = req.query.search;
    let category = req.query.category;

    let query = {}; // Define the query object here

    // if (search) {
    //   query.name = { $regex: search, $options: "i" };
    // }

    // if (category) {
    //   query.category = category;
    // }

    productModel
      .find()
      .populate("categories") // to get the value of category not just the id
      .sort([[sortBy, order]])
      .limit(limit)
      .exec()
      .then((products) => {
        res.status(200).json({
          length: products.length,
          products,
        });
      })
      .catch((error) => {
        res.status(404).json({ error: "products not found !" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.searchProducts = (req, res) => {
  try {
    let filters = req.body.filters;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let order = req.query.order ? req.query.order : "asc";
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
    for (let key in filters) {
      if (filters[key].length > 0) {
        findArgs[key] = filters[key];
      }
    }

    productModel
      .find()
      .populate("categories") // to get the value of category not just the id
      .sort([[sortBy, order]])
      .limit(limit)
      .skip(skip)
      .exec()
      .then((products) => {
        res.status(200).json({
          length: products.length,
          products,
        });
      })
      .catch((error) => {
        res.status(404).json({ error: "products not found !" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.findProduct = (req, res) => {
  try {
    res.send(req.product);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.createProduct = async (req, res) => {
  try {
    let {
      name,
      description,
      price,
      comparePrice,
      sizes,
      colors,
      categories,
      relativeProducts,
    } = req.body;

    colors = colors.split(",");
    categories = categories.split(",");
    if (relativeProducts) {
      relativeProducts = relativeProducts.split(",");
    }

    // add images
    const files = req.files;
    const images = [];
    for (i = 0; i < files.length; i++) {
      images.push({ color: colors[i], file: files[i].filename });
    }

    const product = new productModel({
      name,
      price,
      comparePrice,
      images,
      sizes,
      description,
      categories,
      relativeProducts,
    });
    await product.save();

    res.send({ name, price, comparePrice, images, sizes, description });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await productModel.findOneAndUpdate(
      { _id: productID },
      req.body,
      { new: true }
    );
    res.send(product);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.deleteProduct = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const id = req.params.id;
    const product = await productModel.findById(id).session(session);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await productModel.findByIdAndDelete(id).session(session);

    const images = product.images;
    images.forEach((image) => {
      fs.unlinkSync(`public/Images/${image.file}`);
    });

    await session.commitTransaction();
    session.endSession();

    res.send("Product deleted successfully !!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
