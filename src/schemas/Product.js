const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  brand: { type: String },
  model: { type: String },
  price: { type: Number },
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
  category: { type: String },
  type: { type: String },
  stock: {
    type: [
      {
        size: { type: Number },
        gender: {
          type: { type: String },
          enum: { type: ["male", "female"] },
        },
        color: [String],
        quantity: { type: Number },
      },
    ],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
