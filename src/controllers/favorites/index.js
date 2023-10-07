const addFavoriteByPrductId = require("./addFavoriteByPrductId");
const searchFavoritesBySearchBar = require("./searchFavoritesBySearchBar");
const getFavoritesByUserId = require("./getFavoritesByUserId");
const removeAllFavorites = require("./removeAllFavorites");
const removeFavoriteById = require("./removeFavoriteById")


module.exports = {
    addFavoriteByPrductId,
    getFavoritesByUserId,
    searchFavoritesBySearchBar,
    removeAllFavorites,
    removeFavoriteById
}