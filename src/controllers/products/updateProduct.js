const { validationResult } = require("express-validator");
const { Product } = require("../../schemas/index");
const { updateProductValidationRules } = require("../validators/productValidator");

const updateProduct = async (req, res) => {
  try {
    await Promise.all(updateProductValidationRules.map(rule => rule.run(req)));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed updating product" });
  }
};

module.exports = updateProduct;
