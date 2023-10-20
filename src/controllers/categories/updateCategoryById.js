const { Category } = require('../../schemas');

const updateCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const { category } = req.body;
        const updatedType = await Category.findByIdAndUpdate(id, { category }, { new: true });

        if (updatedType) {
            res.status(200).json(updatedType);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = updateCategoryById;
