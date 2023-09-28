const Product = require("../../schemas/Product");

const getProducts = async (req, res) => {
    const products = await Product.find()
    res.json(products)
};

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

const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product) return res.status(404).json({message: 'Product not found'})
    res.json(product)
};

const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if(!product) return res.status(404).json({message: 'Product not found'})
    res.status(204).json({message: 'Nothing to show'})
};

const updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if(!product) return res.status(404).json({message: 'Product not found'})
    res.json(product)
};

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
}