const { Type, Product } = require('../../schemas')

const deleteTypeById = async (req, res) => {
    try {
        const { id } = res.params
        const inProduct = await Product.findOne({ Type_id: id })
        if (!inProduct.length) {
            const type = await Type.findByIdAndDelete(id);
            if (!type) return res.status(404).json({ message: 'Type not found' })
            res.status(204).json('Brand removed successful')
        } else {
            res.status(400).json('The Type cannot be removed')
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = deleteTypeById