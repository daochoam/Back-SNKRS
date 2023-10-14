const { Brand } = require('../../schemas')

const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find()
        if (brands) res.status(200).json(brands)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

module.exports = getAllBrands