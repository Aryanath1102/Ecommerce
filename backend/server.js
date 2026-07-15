// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./config/mongodb");
const connectCloudinary = require("./config/cloudinary");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRouter");

// Load environment variables FIRST
dotenv.config();

// APP CONFIG
const app = express();
const port = process.env.PORT || 8080;

// Connect to External Services
connectDb();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 👈 ADD THIS LINE
app.use(cors());

// API Endpoints
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/admin", userRouter);

// Start Server
app.listen(port, () => console.log(`Server is running on ${port}`));
