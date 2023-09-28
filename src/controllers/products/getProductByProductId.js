const { Product } = require("../../schemas/index");

const getProductByProductId = async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product) return res.status(404).json({message: 'Product not found'})
    
    res.json(product)
};

module.exports = getProductByProductId;