const { Product } = require("../../schemas");
const product = require("../../assets/Products.json");

const bulkProducts = async (req, res) => {
    try {
        const result = await Product.insertMany(product);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = bulkProducts;