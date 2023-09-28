const { Router } = require("express");
const {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} = require("../controllers/products/index");

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/", createProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.put("/:id", updateProduct);

module.exports = productRouter