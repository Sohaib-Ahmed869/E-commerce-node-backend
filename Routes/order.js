const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Order = require("../Model/order");

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    return res.json(orders);
  } catch (err) {
    return res.json({ message: err });
  }
});

//get orders for a user
router.get("/user", async (req, res) => {
  const token = req.header("Authorization");
  const decoded = jwt.verify(token, "secret");
  const userId = decoded._id;

  try {
    const orders = await Order.find({ userId });
    return res.json(orders);
  } catch (err) {
    return res.json({ message: err });
  }
});

// Create a new order
router.post("/", async (req, res) => {
  const token = req.header("Authorization");
  const decoded = jwt.verify(token, "secret");
  const userId = decoded._id;
  const { products, amount, address } = req.body;

  const newOrder = new Order({
    userId,
    products,
    amount,
    address,
  });

  try {
    const savedOrder = await newOrder.save();
    return res.status(200).json(savedOrder);
  } catch (err) {
    return res.json({ message: err });
  }
});

module.exports = router;
