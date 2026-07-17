const express = require("express");
const {
  addToCartController,
  updateCartController,
  getUserCartController,
} = require("../controller/cartController");
const authMiddleware = require("../middleware/authMiddleware");
const cartRouter = express();

cartRouter.post("/add", authMiddleware, addToCartController);
cartRouter.put("/update", authMiddleware, updateCartController);
cartRouter.get("/get", authMiddleware, getUserCartController);

module.exports = cartRouter;
