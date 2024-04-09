const productModel = require("../models/productModel");

exports.productById = async (req, res, next, id) => {
  try {
    const product = await productModel
      .findById(id)
      .populate("relativeProducts");
    if (!product) {
      return res.status(404).json({
        error: "product not found !",
      });
    }

    req.product = product;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
