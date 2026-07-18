const express = require("express");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
} = require("../controller/orderController");

const orderRouter = express.Router();

// Admin feature
orderRouter.get("/list", adminMiddleware, allOrders);
orderRouter.put("/status", adminMiddleware, updateStatus);

//payment features
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/stripe", authMiddleware, placeOrderStripe);
orderRouter.post("/razorpay", authMiddleware, placeOrderRazorpay);

// User feature
orderRouter.get("/userorders", authMiddleware, userOrders);

module.exports = orderRouter;
