const { Country } = require("../../schemas/index");

const countryDetail = async (req, res) => {
    try {
        const { country, id } = req.query;
        if (!country && !id) res.status(400).json({ message: 'Country name or ID is required' });

        let result = await Country.findById(id);
        if (!result) result = await Country.findOne({ country: { $regex: new RegExp('^' + country + '$', 'i') } });
        if (!result) return res.status(404).json({ message: 'Country not found' });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = countryDetail;