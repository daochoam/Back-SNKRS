const mongoose = require("mongoose");
const { Product } = require("../../schemas/index");

const getProductByProductId = async (req, res) => {
    const { id } = req.params
    console.log("🚀 ~ file: getProductByProductId.js:5 ~ getProductByProductId ~ id:", id)
    try {
        const Parameters = [
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'brands',
                    localField: 'Brand_id',
                    foreignField: '_id',
                    as: 'brand'
                }
            },
            { $unwind: '$brand' },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'Category_id',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            { $unwind: '$category' },
            {
                $lookup: {
                    from: 'types',
                    localField: 'Type_id',
                    foreignField: '_id',
                    as: 'type'
                }
            },
            { $unwind: '$type' },
        ];

        Parameters.push({
            $project: {
                model: 1,
                price: 1,
                gender: 1,
                rating: 1,
                image: 1,
                stock: 1,
                'brand.brand': '$brand.brand',
                'brand.image': '$brand.image.src',
                category: '$category.category',
                type: '$type.type',
            }
        });

        const product = await Product.aggregate(Parameters);
        res.status(200).json(...product);

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
}

module.exports = getProductByProductId;