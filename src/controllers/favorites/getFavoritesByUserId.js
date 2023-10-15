const mongoose = require("mongoose");
const { Favorites, Product } = require('../../schemas')

const aggregateFavorites = async (User_id) => {
    const searchFavorites = await Favorites.aggregate([
        {
            $match: {
                User_id: new mongoose.Types.ObjectId(User_id)
            }
        },
        {
            $unwind: '$favorites'
        },
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
        {
            $lookup: {
                from: 'brands',
                localField: 'productDetail.Brand_id',
                foreignField: '_id',
                as: 'brand'
            }
        },
        { $unwind: '$brand' },
        {
            $lookup: {
                from: 'categories',
                localField: 'productDetail.Category_id',
                foreignField: '_id',
                as: 'category'
            }
        },
        { $unwind: '$category' },
        {
            $lookup: {
                from: 'types',
                localField: 'productDetail.Type_id',
                foreignField: '_id',
                as: 'type'
            }
        },
        { $unwind: '$type' },
        {
            $group: {
                _id: '$_id',
                favorites: {
                    $push: {
                        _id: '$productDetail._id',
                        model: '$productDetail.model',
                        price: '$productDetail.price',
                        'brand.brand': '$brand.brand',
                        'brand.image': '$brand.image.src',
                        category: '$category.category',
                        type: '$type.type',
                        image: { $arrayElemAt: ['$productDetail.image.src', 0] },
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                favorites: '$favorites',
            },
        }
    ]);

    return searchFavorites.length > 0 ? searchFavorites[0].favorites : [];
};

const getFavoritesByUserId = async (req, res) => {
    try {
        const { User_id, role } = req.locals;

        const allFavorites = await aggregateFavorites(User_id);

        if (allFavorites.length > 0) {
            res.status(200).json(allFavorites);
        } else {
            res.status(404).json([]);
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener favoritos' });
    }
}

module.exports = getFavoritesByUserId;
