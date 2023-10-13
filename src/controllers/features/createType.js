const { Type } = require("../../schemas")

const createType = async (req, res) => {
    const type = req.body
    try {
        const newType = new Type(type);
        const createdType = await newType.save();
        if (createdType) res.status(200).json(createdType);
        else res.status(400).json('Type not created');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = createType