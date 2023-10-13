const { Brand, Product } = require('../../schemas')

const deleteBrandById = async (req, res) => {
    try {
        const { id } = res.params
        const inProduct = await Product.findOne({ Brand_id: id })
        if (!inProduct.length) {
            const brand = await Brand.findByIdAndDelete(id);
            if (!brand) return res.status(404).json({ message: 'Brand not found' })
            res.status(204).json('Brand removed successful')
        } else {
            res.status(400).json('The brand cannot be removed')
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = deleteBrandById