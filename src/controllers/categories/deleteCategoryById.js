const { Category, Product } = require("../../schemas")

const deleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params
        const inProduct = await Product.findOne({ Category_id: id })
        if (!inProduct.length) {
            const deleteCategory = await Category.findByIdAndDelete(id)
            if (deleteCategory) res.status(204).json(deleteCategory)
            res.status(404).json('Category not deleted')
        }
        res.status(404).json('The Category cannot be removed')
    } catch (error) {
        res.status(500).json(error.message)
    }
}

module.exports = deleteCategoryById