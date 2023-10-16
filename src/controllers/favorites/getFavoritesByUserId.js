const mongoose = require("mongoose");
const { Favorites, Product } = require('../../schemas')

const getFavoritesByUserId = async (req, res) => {
    try {
        const { User_id } = req.locals;
        const {
            brand,
            gender,
            category,
            color,
            size,
            price,
            type,
            rating,
            search,
            page = 1,
            itemXPage = 9,
        } = req.query;

        const skip = (page - 1) * itemXPage;

        const Parameters = [
            {
                $match: {
                    User_id: new mongoose.Types.ObjectId(User_id),
                }
            },
            {
                $lookup: {
                    from: 'products', // Nombre de la colección de productos
                    localField: 'favorites',
                    foreignField: '_id',
                    as: 'ProductDetail'
                }
            },
            { $unwind: '$ProductDetail' },

            {
                $lookup: {
                    from: 'brands',
                    localField: 'ProductDetail.Brand_id',
                    foreignField: '_id',
                    as: 'brand'
                }
            },
            { $unwind: '$brand' },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'ProductDetail.Category_id',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            { $unwind: '$category' },
            {
                $lookup: {
                    from: 'types',
                    localField: 'ProductDetail.Type_id',
                    foreignField: '_id',
                    as: 'type'
                }
            },
            { $unwind: '$type' },
        ];

        if (search) {
            Parameters.push({
                $match: {
                    $or: [
                        { 'model': new RegExp(search, 'i') },
                        { 'gender': new RegExp(search, 'i') },
                        { 'brand.brand': new RegExp(search, 'i') },
                        { 'type.type': new RegExp(search, 'i') },
                        { 'category.category': new RegExp(search, 'i') },
                        { 'rating': parseFloat(search) },
                        { 'price': parseFloat(price) },
                        { 'stock.color.name': new RegExp(search, 'i') },
                        { 'stock.size': parseFloat(search) },
                    ]
                }
            });
        } else {
            Parameters.push({
                $match: {
                    $and: [
                        gender ? { 'gender': gender.toLowerCase() } : {},
                        brand ? { 'brand.brand': new RegExp(brand, 'i') } : {},
                        type ? { 'type.type': new RegExp(type, 'i') } : {},
                        category ? { 'category.category': new RegExp(category, 'i') } : {},
                        rating ? { 'rating': parseFloat(rating) } : {},
                        color ? { 'stock.color.name': new RegExp(color, 'i') } : {},
                        size ? { 'stock.size': parseFloat(size) } : {},
                    ]
                }
            });
        }


        const countPipeline = [...Parameters, { $count: 'totalFavorites' }];
        const totalProductsResult = await Favorites.aggregate(countPipeline);
        const totalFavorites = totalProductsResult.length > 0 ? totalProductsResult[0].totalFavorites : 0;

        Parameters.push({ $skip: skip }, { $limit: itemXPage });

        Parameters.push({
            $group: {
                _id: '_id',
                favorites: {
                    $push: {
                        _id: '$ProductDetail._id',
                        model: '$ProductDetail.model',
                        price: '$ProductDetail.price',
                        brand: {
                            brand: '$brand.brand',
                            image: '$brand.image.src'
                        },
                        stock: '$ProductDetail.stock',
                        category: '$category.category',
                        type: '$type.type',
                        image: { $arrayElemAt: ['$ProductDetail.image.src', 0] },
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
        )

        const totalPages = Math.ceil(totalFavorites / itemXPage);
        const [{ favorites }] = await Favorites.aggregate(Parameters);
        console.log("🚀 ~ file: getFavoritesByUserId.js:136 ~ getFavoritesByUserId ~ favorites:", favorites)

        const data = {
            favorites,
            totalFavorites: totalFavorites,
            pages: {
                currentPage: parseInt(page),
                itemsRange: { min: skip, max: skip + (favorites.length - 1) },
                totalPages: totalPages,
            },
        }

        if (favorites.length) {
            res.status(200).json(data);
        } else {
            res.status(404).json([]);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener favoritos' });
    }
}

module.exports = getFavoritesByUserId;
