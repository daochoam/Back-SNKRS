const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  brand: String,
  model: String,
  size: Number,
  color: String,
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  image: [String],
  category: [String],
  type: [String],
  stock: {
    size: String,
    gender: String,
    color: String,
    price: Number,
    amount: Number
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
