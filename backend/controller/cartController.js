const userModel = require("../models/UserModel");

const addToCartController = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cart[itemId] = {};
      cart[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).send({ success: true, msg: "Added to cart." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in Add TO Cart Controller",
      error: error.message,
    });
  }
};

const updateCartController = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).send({
      success: true,
      msg: "Cart updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msg: "Error in updated cart controller.",
      error: error.message,
    });
  }
};

const getUserCartController = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    res.status(200).send({ success: true, msg: "Successfully retrieved." });
  } catch (error) {}
};

module.exports = {
  addToCartController,
  updateCartController,
  getUserCartController,
};
