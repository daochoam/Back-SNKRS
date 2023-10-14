const { State } = require("../../schemas/index");
const states = require("../../assets/States.json");

const bulkStates = async (req, res) => {
    try {
        const result = await State.insertMany(states);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = bulkStates;