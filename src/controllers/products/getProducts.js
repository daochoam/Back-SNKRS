const { Product } = require("../../schemas/index");

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
            sortSales,
            sortPrice,
            page = 1,
            itemXPage = 9,
        } = req.query;
        console.log("🚀 ~ file: getProducts.js:23 ~ getProducts ~ req.query:", req.query)

        const skip = (parseInt(page) - 1) * parseInt(itemXPage);

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

        //! @params SORT{ Price, Sales}
        // ascending order (1) by "price" field
        if (sortPrice == 'ascending') Parameters.push({ $sort: { price: 1 } })
        // descenden order (1) by "price" field
        if (sortPrice == 'descending') Parameters.push({ $sort: { price: -1 } })
        // ascending order (1) by "sales" field
        if (sortSales == 'ascending') Parameters.push({ $sort: { sales: 1 } })
        // descenden order (1) by "sales" field
        if (sortSales == 'descending') Parameters.push({ $sort: { sales: -1 } })

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
                        { 'price': { $lte: parseFloat(search) } },
                        { 'stock.color.name': new RegExp(search, 'i') },
                        // { 'stock.size': parseFloat(search) },
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

        // Agregación para contar el número de productos totales encontrados
        const countPipeline = [...Parameters, { $count: 'totalProducts' }];
        const totalProductsFound = await Product.aggregate(countPipeline);
        const totalProducts = totalProductsFound.length > 0 ? totalProductsFound[0].totalProducts : 0;

        // Aplica la paginación
        Parameters.push({ $skip: skip }, { $limit: parseInt(itemXPage) });

        // Proyecta las propiedades deseadas
        Parameters.push({
            $project: {
                model: 1,
                price: 1,
                gender: 1,
                rating: 1,
                stock: 1,
                sales: 1,
                image: { $arrayElemAt: ['$image.src', 0] },
                brand: {
                    brand: '$brand.brand',
                    image: '$brand.image.src'
                },
                category: '$category.category',
                type: '$type.type',
            }
        });
        const products = await Product.aggregate(Parameters);

        const totalPages = Math.ceil(totalProducts / parseInt(itemXPage));

        res.json({
            products,
            totalProducts: totalProducts,
            pages: {
                currentPage: parseInt(page),
                itemRange: { min: skip, max: skip + (products.length - 1) },
                totalPages: totalPages,
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};



module.exports = getProducts;