const { Router } = require('express');
const favoritesRoutes = Router();

const {
    addFavoriteByPrductId,
    getFavoritesByUserId,
    searchFavoritesBySearchBar,
    removeFavoriteById,
    removeAllFavorites,

} = require('../controllers/favorites')

favoritesRoutes.get("", searchFavoritesBySearchBar)
favoritesRoutes.get("/:page", getFavoritesByUserId)
favoritesRoutes.post("/:Product_id", addFavoriteByPrductId)
favoritesRoutes.delete("/:id", removeFavoriteById)
favoritesRoutes.delete("/", removeAllFavorites)

module.exports = favoritesRoutes