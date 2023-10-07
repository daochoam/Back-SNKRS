const { Favorites, Product } = require('../../schemas')

const getFavoritesByUserId = (req, res) => {
    const { page } = req.params
    const { model, brand, size, color, price, order, itemsXPages } = req.query
    try {
        const { User_id } = req.locals


    } catch (error) {

    }
}

module.exports = getFavoritesByUserId