const { Brand } = require("../../schemas");
const brands = require("../../assets/Brands.json");

const bulkBrands = async (req, res) => {
    try {
        const result = await Brand.insertMany(brands);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = bulkBrands;