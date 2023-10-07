const { State } = require("../../schemas/index");

const stateList = async (req, res) => {
    try {
        const { country } = req.query;
        if (!country) res.status(400).json({ message: 'Country name is required' });
        const result = await State.findOne({ country: { $regex: new RegExp('^' + country + '$', 'i') } });
        if (!result) return res.status(404).json({ message: 'Country not found' });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = stateList;