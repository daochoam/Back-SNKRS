const { City } = require("../../schemas/index");
const cities = require("../../assets/City.json");

const bulkCities = async (req, res) => {
    try {
        const result = await City.insertMany(cities);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = bulkCities;