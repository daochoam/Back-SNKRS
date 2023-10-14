const { Product } = require("../../schemas/index");

const getProducts = async (req, res) => {
    try {

        const {
            sku,
            model,
            brand,
            gender,
            category,
            color,
            size,
            priceMin,
            priceMax,
            type,
            page = 1,
            limit = 10,
            sort, // Nuevo parámetro para ordenar
            search
        } = req.query;

        let filter = {};

        if (search) {
            filter = {
                $or: [
                    { brand: { $regex: new RegExp(search, "i") } },
                    { model: { $regex: new RegExp(search, "i") } },
                    { category: { $regex: new RegExp(search, "i") } },
                    { type: { $regex: new RegExp(search, "i") } },
                    // { 'stock.color.name': { $regex: new RegExp(search, "i") } },
                    // { 'stock.size': { $regex: new RegExp(search, "i") } },
                    // { 'stock.quantity': { $regex: new RegExp(search, "i") }, }
                ],
            }
        }
        else {
            if (sku) filter.sku = { $regex: new RegExp(sku, "i") };
            if (brand) filter.brand = { $regex: new RegExp(brand, "i") };
            if (model) filter.model = { $regex: new RegExp(model, "i") };
            if (priceMin && !isNaN(priceMin)) filter.price = { ...filter.price, $gte: parseFloat(priceMin) };
            if (priceMax && !isNaN(priceMax)) filter.price = { ...filter.price, $lte: parseFloat(priceMax) };
            if (category) filter.category = { $regex: new RegExp(category, "i") };
            if (type) filter.type = { $regex: new RegExp(type, "i") };
            if (color) filter.stock.color.name = { $regex: new RegExp(color, "i") };
            if (size) filter.stock.size = { $regex: new RegExp(size, "i") };
        }

        const totalCount = await Product.countDocuments(filter);

        const skip = (page - 1) * limit;
        const lim = parseInt(limit + skip)


        let productsQuery = Product.find(filter)
            .skip(skip)
            .limit(limit);

        if (sort) {
            if (sort === 'price_asc') {
                productsQuery = productsQuery.sort({ price: 1 });
            } else if (sort === 'price_desc') {
                productsQuery = productsQuery.sort({ price: -1 });
            }
        }

        const products = await productsQuery;
        const totalPages = Math.ceil(totalCount / limit);

        res.json({
            products,
            totalPages,
            page: {
                range: { min: skip, max: skip + products.length },
                currentPage: parseInt(page),
                totalResults: totalCount,
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

module.exports = getProducts;