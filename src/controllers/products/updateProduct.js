const { Product } = require("../../schemas/index");

const updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if(!product) return res.status(404).json({message: 'Product not found'})
    res.json(product)
};

module.exports = updateProduct;