const { City } = require("../../schemas/index");

const cityList = async (req, res) => {
    try {
        const { country, state } = req.query;
        if (!country || !state) res.status(400).json({ message: 'Country and state are required' });

        const result = await City.findOne({
            country: { $regex: new RegExp('^' + country + '$', 'i') },
            state: { $regex: new RegExp('^' + state + '$', 'i') }
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = cityList;