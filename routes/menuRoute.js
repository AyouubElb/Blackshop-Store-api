const express = require("express");

const {
  allMenus,
  createMenu,
  updateMenu,
} = require("../controllers/menuController");

const router = express.Router();

router.get("/", allMenus);

router.post("/create", createMenu);

router.patch("/update/:id", updateMenu);

module.exports = router;
