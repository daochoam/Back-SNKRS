const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  sku: { type: String },
  model: { type: String },
  brand: { type: String },
  category: { type: String },
  type: { type: String },
  price: { type: Number },
  gender: {
    type: { type: String },
    enum: { type: ["male", "female", "girl", "boy"] },
  },
  image: {
    type: [
      {
        id: { type: String },
        src: { type: String },
        typeImage: { type: String },
        size: { type: Number },
        color: { type: String },
      },
    ],
  },
  stock: {
    type: [
      {
        size: { type: Number },
        color: { type: String },
        quantity: { type: Number },
        image: { type: String },
      },
    ],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
