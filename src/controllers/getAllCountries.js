const { Country } = require('../schemas')

const getAllCountries = async (req, res) => {
    try {
        const countries = Country.find()
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getAllCountries;