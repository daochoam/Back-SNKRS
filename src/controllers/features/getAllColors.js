const { Colors } = require("../../schemas/index");

const getAllColors = async (req, res) => {
    try {
        const colors = await Colors.find();
        if (colors) res.status(200).json(colors)
        else res.status(404).json({ message: 'Colors not found' })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getAllColors;