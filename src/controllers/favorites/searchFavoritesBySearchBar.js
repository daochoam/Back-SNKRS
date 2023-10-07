const { Favorites, Product } = require('../../schemas')

const searchFavoritesBySearchBar = (req, res) => {
    const { search } = req.query
    try {
        const { User_id } = req.locals

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = searchFavoritesBySearchBar