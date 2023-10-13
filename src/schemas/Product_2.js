const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  model: { type: String },
  Brand_id: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
  },
  Category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  Type_id: {
    type: Schema.Types.ObjectId,
    ref: 'Type',
    required: true,
  },
  price: { type: Number },
  gender: {
    type: String,
    enum: ["men", "women", "kids"],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  stock: {
    type: [
      {
        size: { type: Number },
        quantity: { type: Number },
        color: {
          type: {
            name: { type: String },
            html: { type: String }
          }
        },
      },
    ],
  },
  image: {
    type: [
      {
        id: { type: String },
        src: { type: String },
        color: { type: String },
      },
    ],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
