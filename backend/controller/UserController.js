const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
// };

// Route for Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        msg: "Please provide all details.",
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

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5m" },
    );

    res
      .status(200)
      .send({ success: true, msg: "Login Successfully", user, token });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Error in Login API",

      error: error.message,
    });
  }
};

// Route For user register

const registerUser = async (req, res) => {
  try {
    const { name, email, password, cartData } = req.body;

    // Check if valid email and password format

    if (!validator.isEmail(email)) {
      return res
        .status(500)
        .send({ success: false, msg: "Please provide valid email." });
    }
    if (password.length < 8) {
      return res.status(500).send({
        success: false,
        msg: "Please provide enter a strong password of length 8.",
      });
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    res.status(201).send({ success: true, msg: "Successfully Registered" });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Error in Register User ",
      error: error.message,
    });
  }
};

// Route For ADMIN LOGIN

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        {
          email,
          role: "ADMIN",
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "5m" },
      );
      res.status(200).send({
        success: true,
        msg: "Admin Logged In Successfully.",
        token,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Error in Admin Login",
      error: error.message,
    });
  }
};

module.exports = { loginUser, registerUser, adminLogin };
