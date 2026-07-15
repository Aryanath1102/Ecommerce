const productModel = require("../models/ProductModel");

// ADD Product

const addProductController = async (req, res) => {
  console.log("BODY REQ:", req.body);
  console.log("FILES REQ:", req.files);
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      date,
    } = req.body;

    // 1. Gather files safely from req.files mapping array objects
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    // Filter out undefined fields and extract filenames/paths
    const imagesArray = [image1, image2, image3, image4]
      .filter((img) => img !== undefined)
      .map((img) => img.path || img.filename); // Saves the reference location name string

    // 2. Input Integrity Validation
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !subCategory ||
      !sizes
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }

    // 3. Construct new schema database configuration model instance
    const newProduct = new productModel({
      name,
      description,
      price: Number(price), // Explicitly cast to Number to avoid schema type friction
      category,
      subCategory,
      sizes: typeof sizes === "string" ? JSON.parse(sizes) : sizes, // Parse back to Array if sent as a JSON string
      image: imagesArray, // Fixes the "image field required" validation crash!
      bestseller: bestseller === "true" || bestseller === true ? true : false,
      date: date ? Number(date) : Date.now(),
    });

    const product = await newProduct.save();

    return res.status(201).json({
      success: true,
      msg: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.error("Mongoose Product Insertion Error:", error);
    return res.status(500).json({
      success: false,
      msg: "Error in Add Product Controller",
      error: error.message,
    });
  }
};

// List Product
const listProductController = async (req, res) => {
  try {
    const product = await productModel.find();
    if (!product.length) {
      return res.status(404).send({ success: false, msg: "No product found" });
    }
    res.status(200).send({
      success: true,
      msg: "Successfully Retrived all Products",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Error in List Product Controller",
      error: error.message,
    });
  }
};

// Remove Product

const removeProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(404).send({ success: false, msg: "Please provide Id" });
    }
    const product = await productModel.findByIdAndDelete(productId);
    if (!product) {
      return res
        .status(404)
        .send({ success: false, msg: "No product is found with this id" });
    }
    res.status(200).send({ success: true, msg: "Product Removed with id" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, msg: "Error in Remove Product Controller " });
  }
};

// Single Product
const singleProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(404).send({ success: false, msg: "Please provide id" });
    }
    const product = await productModel.findById(productId);

    if (!product) {
      return res
        .status(404)
        .send({ success: false, msg: "No product found with this id" });
    }
    res
      .status(201)
      .send({ success: true, msg: "Product found with the id ", product });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Error in Single Product Controller",
      error: error.message,
    });
  }
};

module.exports = {
  addProductController,
  listProductController,
  removeProductController,
  singleProductController,
};
