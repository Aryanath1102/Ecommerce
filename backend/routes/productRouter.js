const express = require("express");
const upload = require("../middleware/multer");
const {
  addProductController,
  listProductController,
  removeProductController,
  singleProductController,
} = require("../controller/ProductController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const productRouter = express.Router();

productRouter.post(
  "/addProduct",
  authMiddleware,
  adminMiddleware,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProductController,
);

productRouter.get("/listProduct", listProductController);
productRouter.delete(
  "/removeProduct/:id",
  authMiddleware,
  adminMiddleware,
  removeProductController,
);
productRouter.get("/Product/:id", authMiddleware, singleProductController);

productRouter.get("/hello", (req, res) => {
  res.send("hello");
});

module.exports = productRouter;
