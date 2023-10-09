const { Favorites, Product } = require('../../schemas')

const removeFavoriteById = async (req, res) => {    
    try {
        const { Product_id } = req.params
        const isProduct = await Product.findById(Product_id);
            
        if(isProduct){
            const { User_id } = req.locals;
            // const User_id = "652052d8b9b21219c301202b"; 

            let [ favoritesBefore ] = await Favorites.find({ User_id });
            let favoritesAfter      = {};
    
            favoritesBefore.favorites = favoritesBefore.favorites.filter(( shoeId ) => {              
                return shoeId != Product_id
            })
            
            favoritesAfter  = await favoritesBefore.save();    
    
            if(favoritesAfter){
                res.status(200).json(favoritesAfter)
            }
            else{
                res.status(404).json({ "error": "Something went wrong" });
            }
        }
        else{
            res.status(400).json({ "error" : `{Product_id : ${Product_id}} does not exist in the database`})
        }

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

module.exports = removeFavoriteById