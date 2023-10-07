const { Country } = require("../../schemas/index");
const countries = require("../../../Country.json");

const bulkCountries = async (req, res) => {
    try {
        const result = await Country.insertMany(countries);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = bulkCountries;