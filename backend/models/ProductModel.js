const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: [String], // Array of image URLs
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  subCategory: {
    type: String,
    required: true,
  },

  sizes: {
    type: [String],
    required: true,
  },

  bestseller: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Number,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.product || mongoose.model("product", productSchema);
