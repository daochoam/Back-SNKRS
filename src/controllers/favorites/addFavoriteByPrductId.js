const { Favorites, Product } = require('../../schemas')

const addFavoriteByPrductId = (req, res) => {
    const { _id } = req.params
    try {
        const { User_id } = req.locals



    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = addFavoriteByPrductId