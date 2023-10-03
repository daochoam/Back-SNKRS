const { validationResult } = require("express-validator");
const { Product } = require("../../schemas/index");
const {
  createProductValidationRules,
} = require("../validators/productValidator");

const createProduct = async (req, res) => {
  try {
    await Promise.all(createProductValidationRules.map(rule => rule.run(req)));
  
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { brand, model, price, image, category, type, stock } = req.body;

    const newProduct = new Product({
      brand,
      model,
      price,
      image,
      category,
      type,
      stock,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create Product" });
  }
};

module.exports = createProduct;
