const createProduct = require("./createProduct");
const getProducts   = require("./getProducts");
const deleteProduct = require("./deleteProduct");
const updateProduct = require("./updateProduct");
const getProductByProductId = require("./getProductByProductId");

const controllers = {
  getProductByProductId,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct
}

module.exports = controllers;
