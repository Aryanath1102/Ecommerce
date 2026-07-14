const express = require("express");
const app = express();
const {
  loginUser,
  registerUser,
  adminLogin,
} = require("../controller/UserController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

module.exports = userRouter;
