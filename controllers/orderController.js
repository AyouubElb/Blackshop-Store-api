const orderModel = require("../models/orderModel");

exports.allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().populate("product");
    if (!orders) {
      res.status(404).json({
        error: "Orders not found !",
      });
    }
    res.send(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.findOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await orderModel.findById(id).populate("productList.product");
    if (!order) {
      res.status(404).json({ error: "Order not found !" });
    }
    res.send(order);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { fullname, phone, city, address, review, productList, total } =
      req.body;
    if (!fullname || !phone || !city || !address || productList.length < 1) {
      res.status(404).json("All fields are required !");
    }
    const order = new orderModel({
      fullname,
      phone,
      city,
      address,
      review,
      productList,
      total,
    });
    const newOrder = await order.save();
    res.send(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
