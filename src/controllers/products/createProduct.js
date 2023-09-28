const { Product } = require("../../schemas/index");

const createProduct = async (req, res) => {
    const {
      brand,
      model,
      price,
      image,
      category,
      type,
      stock,
    } = req.body;
  
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
   
    res.json(savedProduct);
};

module.exports = createProduct;