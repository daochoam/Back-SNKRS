const { Type, Category } = require('../../schemas')

const createType = async (req, res) => {
    try {
        const { types, category, gender } = req.body
        const { _id } = Category.findOne({ category })
        const newType = new Type({
            types,
            category,
            Category_id: _id,
            gender: gender
        })
        const typeCreated = await newType.save()
        if (typeCreated) res.status(200).json(typeCreated)
        else res.status(400).json('Error saving brand')
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

module.exports = createType