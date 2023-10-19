const { Product } = require("../../schemas/index");
const { addImageStorage } = require('../firebaseStorage/index');
const { validationResult } = require("express-validator");
const { createProductValidationRules } = require("../validators/productValidator");

const createProduct = async (req, res) => {
  try {
    // await Promise.all(createProductValidationRules.map(rule => rule.run(req)));
  
    // const errors = validationResult(req);
  
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
  
    const { model, Brand_id, Category_id, Type_id, gender, price, rating, stock } = req.body;
    
    const attributes   = { model, Brand_id, Category_id, Type_id, gender, price, rating, stock };
    const newProduct   = new Product( attributes );
    const savedProduct = await newProduct.save();    

    if(savedProduct){
      res.status(200).json(savedProduct);
    }
    else{
      res.status(404).json({ "error": "Something went wrong" });
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createProduct;
