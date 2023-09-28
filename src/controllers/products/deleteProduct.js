const { Product } = require("../../schemas/index");

const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if(!product) return res.status(404).json({message: 'Product not found'})
    
    res.status(204).json({message: 'Nothing to show'})
};

module.exports = deleteProduct;