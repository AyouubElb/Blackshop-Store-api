const express = require("express");

const {
  allCategories,
  findCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { upload } = require("../middlewares/uploadImage");

const router = express.Router();

router.get("/", allCategories);

router.get("/:id", findCategory);

router.post("/create", upload.single("image"), createCategory);

router.patch("/update/:id", upload.single("image"), updateCategory);

router.delete("/delete/:id", deleteCategory);

module.exports = router;
