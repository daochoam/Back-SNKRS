const { Country } = require("../../schemas/index");

const countryList = async (req, res) => {
    try {
        const result = await Country.find({}, { _id: 1, country: 1 }).lean();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = countryList;