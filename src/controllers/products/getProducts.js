const { Product, Brand } = require("../../schemas/index");

const getProducts = async (req, res) => {
    try {
        const {
            model,
            brand,
            gender,
            category,
            color,
            size,
            type,
            rating,
            maxPrice,
            minPrice,
            search,
            quantity,
            page = 1,
            itemXPage = 9,
        } = req.query;

        const skip = (page - 1) * itemXPage;

        // Define la etapa de agregación inicial
        const Parameters = [
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
            {
                $match: {
                    'stock.quantity': { $gt: 0 }
                }
            }
        ];

        // Aplica los filtros según los parámetros proporcionados
        if (search) {
            Parameters.push({
                $match: {
                    $or: [
                        { 'model': new RegExp(search, 'i') },
                        { 'gender': new RegExp(search, 'i') },
                        { 'brand.brand': new RegExp(search, 'i') },
                        { 'type.type': new RegExp(search, 'i') },
                        { 'category.category': new RegExp(search, 'i') },
                        { 'rating': parseFloat(rating) },
                        { 'price': { $gte: parseFloat(search) } },
                        { 'price': { $lte: parseFloat(search) } },
                        { 'stock.color.name': new RegExp(search, 'i') },
                        { 'stock.size': parseFloat(search) },
                        { 'stock.quantity': parseFloat(search) },
                    ]
                }
            });
        } else {
            Parameters.push({
                $match: {
                    $and: [
                        model ? { 'model': new RegExp(model, 'i') } : {},
                        gender ? { 'gender': gender.toLowerCase() } : {},
                        brand ? { 'brand.brand': new RegExp(brand, 'i') } : {},
                        type ? { 'type.type': new RegExp(type, 'i') } : {},
                        category ? { 'category.category': new RegExp(category, 'i') } : {},
                        rating ? { 'rating': parseFloat(rating) } : {},
                        minPrice ? { 'price': { $gte: parseFloat(minPrice) } } : {},
                        maxPrice ? { 'price': { $lte: parseFloat(maxPrice) } } : {},
                        color ? { 'stock.color.name': new RegExp(color, 'i') } : {},
                        size ? { 'stock.size': parseFloat(size) } : {},
                        quantity ? { 'stock.quantity': parseInt(quantity) } : {}
                    ]
                }
            });
        }

        // Agregación para contar el número de productos totales encontrados
        const countPipeline = [...Parameters, { $count: 'totalProducts' }];
        const totalProductsResult = await Product.aggregate(countPipeline);
        const totalProducts = totalProductsResult.length > 0 ? totalProductsResult[0].totalProducts : 0;

        // Aplica la paginación
        Parameters.push({ $skip: skip }, { $limit: itemXPage });

        // Proyecta las propiedades deseadas
        Parameters.push({
            $project: {
                model: 1,
                price: 1,
                gender: 1,
                rating: 1,
                image: { $arrayElemAt: ['$image.src', 0] },
                'brand.brand': '$brand.brand',
                'brand.image': '$brand.image.src',
                category: '$category.category',
                type: '$type.type',
            }
        });

        const products = await Product.aggregate(Parameters);

        const totalPages = Math.ceil(totalProducts / itemXPage);

        res.json({
            products,
            totalProducts: totalProducts,
            pages: {
                currentPage: parseInt(page),
                itemsPage: { min: skip, max: skip + (products.length - 1) },
                totalPages: totalPages,
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};



module.exports = getProducts;