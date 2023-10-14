const mongoose = require("mongoose");
const { Favorites, Product } = require('../../schemas')

const aggregateFavorites = async (User_id) => {
    const [searchFavorites] = await Favorites.aggregate([
        //--------------------**match**--------------------
        {
            $match: {
                User_id: new mongoose.Types.ObjectId(User_id)
            }
        },
        //-----**Descomponiendo el array favorites **------
        {
            $unwind: '$favorites'
        },
        //--------------------**Product**------------------
        {
            $lookup: {
                from: 'products',
                localField: 'favorites',
                foreignField: '_id',
                as: 'productDetail',
            },
        },
        {
            $unwind: '$productDetail'
        },
        //--------------------**group**--------------------
        {
            $group: {
                _id: '$_id',
                favorites: {
                    $push: {
                        _id: '$productDetail._id',
                        price: '$productDetail.price',
                        brand: '$productDetail.brand',
                        model: '$productDetail.model',
                        type: '$productDetail.type',
                        category: '$productDetail.category',
                        // image    : '$productDetail.image',
                    }
                }
            }
        },
        //--------------------**project**------------------
        {
            $project: {
                _id: 0,
                favorites: '$favorites',
            }
        }
    ]);

    return (searchFavorites.favorites);
};

const getFavoritesByUserId = async (req, res) => {
    // const { page } = req.params;
    try {
        const { User_id, role } = req.locals;

        const allFavorites = await aggregateFavorites(User_id);

        if (allFavorites) {
            res.status(200).json(allFavorites);
        }
        else {
            res.status(404).json(["Empty"]);
        }

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = getFavoritesByUserId