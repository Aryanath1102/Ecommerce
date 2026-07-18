const OrderModels = require("../models/OrderModels");
const UserModel = require("../models/UserModel");

// Placing order using COD
const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new OrderModels(orderData);
    await newOrder.save();

    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).send({ success: true, msg: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, msg: error.message });
  }
};

// Placing Order using Stripe
const placeOrderStripe = async (req, res) => {};

// Placing Order using Razorpay

const placeOrderRazorpay = async (req, res) => {};

// All Orders Data  for Admin Pane

const allOrders = async (req, res) => {};

// User Orders Data  for Frontend

const userOrders = async (req, res) => {};

// Update Order Status from Admin Panel

const updateStatus = async (req, res) => {};

module.exports = {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  userOrders,
  updateStatus,
};
