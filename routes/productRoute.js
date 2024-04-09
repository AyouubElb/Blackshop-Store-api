const express = require("express");

const {
  allProducts,
  findProduct,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { productById } = require("../middlewares/product");
const { upload } = require("../middlewares/uploadImage");

const router = express.Router();

router.get("/", allProducts);

router.get("/:productId", findProduct);

router.post("/search-products", searchProducts);

router.post("/create", upload.array("images", 5), createProduct);

router.patch("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

router.param("productId", productById);

module.exports = router;
