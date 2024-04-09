const express = require("express");

const {
  allOrders,
  findOrder,
  createOrder,
} = require("../controllers/orderController");

const { upload } = require("../middlewares/uploadImage");

const router = express.Router();

router.get("/", allOrders);

router.get("/:id", findOrder);

router.post("/create", createOrder);

module.exports = router;
