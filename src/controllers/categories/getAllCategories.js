const { Category } = require("../../schemas")

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (categories) res.status(200).json(categories)
        else res.status(404).json('Categories not found')
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getAllCategories