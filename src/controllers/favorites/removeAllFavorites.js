const { Favorites } = require('../../schemas')

const removeAllFavorites = async (req, res) => {
    try {
        // const { User_id } = req.locals;
        const User_id = "652052d8b9b21219c301202b"; 

        let [ favoritesBefore ] = await Favorites.find({ User_id });
        
        favoritesBefore.favorites = [];

        const  favoritesAfter = await favoritesBefore.save();

        if(favoritesAfter){
            res.status(200).json(favoritesAfter);
        }
        else{
            res.status(404).json({ "error": "Something went wrong" });
        }
        
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = removeAllFavorites