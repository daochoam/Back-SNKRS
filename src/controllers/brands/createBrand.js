const { Brand } = require('../../schemas')

const createBrand = async (req, res) => {
    try {
        const brand = req.body
        const newBrand = new Brand(brand)
        const brands = await newBrand.save()
        if (brands) res.status(200).json(brands)
        else res.status(400).json('Error saving brand')
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

module.exports = createBrand