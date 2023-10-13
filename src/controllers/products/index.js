const createProduct = require("./createProduct");
const getProducts   = require("./getProducts");
const deleteProduct = require("./deleteProduct");
const updateProduct = require("./updateProduct");
const updateImageProduct = require("./updateImageProduct");
const getProductByProductId = require("./getProductByProductId");

const controllers = {
  getProductByProductId,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  updateImageProduct,
}

module.exports = controllers;
