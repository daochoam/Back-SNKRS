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
   
    const colorImages = [ req.body.colorA, req.body.colorB, req.body.colorC ];
    
    console.log("colorImages", colorImages);

    const imagesFiles = req.files;    
    const imagesShoes = await addImageStorage(imagesFiles, colorImages);    

    res.status(200).json({"image": imagesShoes});

    // const { brand, model, price, category, type, stock } = req.body;
    
    // const attributes   = { image : imagesShoes, brand, model, price, category, type, stock };
    // const newProduct   = new Product( attributes );
    // const savedProduct = await newProduct.save();    

    // if(savedProduct){
    //   res.status(200).json(savedProduct);
    // }
    // else{
    //   res.status(404).json({ "error": "Something went wrong" });
    // }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createProduct;
