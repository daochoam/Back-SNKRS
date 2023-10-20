const { Category } = require("../../schemas")

const createCategory = async (req, res) => {
    try {

        const { category } = req.body
        const newCategory = new Category(category);
        const createdCategory = await newCategory.save();
        if (createdCategory) res.status(200).json(createdCategory);
        else res.status(400).json('Category not created');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = createCategory