const { Colors } = require("../../schemas");
const color = require("../../assets/Colors.json");

const bulkColors = async (req, res) => {
    try {
        const result = await Colors.insertMany(color);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = bulkColors;