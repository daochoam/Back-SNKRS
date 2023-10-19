const multer = require("multer");
const { Router } = require("express");
const controllers = require("../controllers/products/index");

const productRouter = Router();

productRouter.post("/", controllers.createProduct);
productRouter.get("/", controllers.getProducts);
productRouter.get("/:id", controllers.getProductByProductId);
productRouter.put("/:id", multer().array("imagesFiles"),controllers.updateProduct);
productRouter.delete("/:id", controllers.deleteProduct);
productRouter.put("/images/:id", multer().array("imagesFiles"), controllers.updateImageProduct);

module.exports = productRouter