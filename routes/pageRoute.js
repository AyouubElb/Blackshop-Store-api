const express = require("express");

const {
  allPages,
  findPage,
  createPage,
  updatePage,
  deletePage,
} = require("../controllers/pageController");

const { upload } = require("../middlewares/uploadImage");

const router = express.Router();

router.get("/", allPages);

router.get("/:id", findPage);

router.post("/create", upload.none(), createPage);

router.patch("/update/:id", updatePage);

router.delete("/delete/:id", deletePage);

module.exports = router;
