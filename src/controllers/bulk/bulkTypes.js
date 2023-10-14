const { Type } = require("../../schemas/index");
const types = require("../../assets/Types.json");

const bulkTypes = async (req, res) => {
    try {
        const result = await Type.insertMany(types);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = bulkTypes;