const multer = require("multer");
const { Router } = require("express");
const controllers = require("../controllers/products/index");

const productRouter = Router();

productRouter.post("/", multer().array("imagesFiles"), controllers.createProduct);
productRouter.get("/", controllers.getProducts);
productRouter.get("/:id", controllers.getProductByProductId);
productRouter.put("/:id/", controllers.updateProduct);
productRouter.delete("/:id", controllers.deleteProduct);
productRouter.put("/:Product_id/:Image_id/", multer().single("newImageProduct"), controllers.updateImageProduct);

module.exports = productRouter