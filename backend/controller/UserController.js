const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

// Route for Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(500).send({
        success: false,
        msg: "Please provide all details.",
        error,
      });
    }
    //   Check User

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        msg: "User No Found OR Password Not Matched",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({ success: false, msg: "Invalid Password" });
    }
    res.status(200).send({ success: true, msg: "Login Successfully", user });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Error in Login API",

      error,
    });
  }
};

// Route For user register

const registerUser = async (req, res) => {
  try {
    const { name, email, password, cartData } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res
        .status(500)
        .send({ success: false, msg: "Please provide all details." });
    }

    // check existing

    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        msg: "Email Already Registered, Please Login",
      });
    }

    // hashing password
    var salt = bcrypt.genSaltSync(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      cartData,
    });
    res.status(201).send({ success: true, msg: "Successfully Registered" });
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

// Route For ADMIN LOGIN

const adminLogin = async (req, res) => {
  res.send({ msg: "ADMIN api working" });
};

module.exports = { loginUser, registerUser, adminLogin };
