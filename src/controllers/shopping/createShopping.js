const mongoose = require("mongoose");
const { Shopping, Product } = require("../../schemas/index");
const createOrderMP = require('../../services/createOrderMP');

const createShopping = async (req, res) => {
    try {

        ////!! MODELO AJUSTADO /////
        const { purchase, shipping } = req.body;

        const purchFeatures = purchase.map(({ Product_id, color, size }) => { return { _id: Product_id, color: color, size: size } });
        console.log("🚀 ~ file: createShopping.js:11 ~ createShopping ~ purchFeatures:", purchFeatures)
        const allPurchaseProducts = await Promise.all(purchFeatures.map(async ({ _id, size, color }) => {
            return await Product.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(_id) } },
                {
                    $lookup: {
                        from: 'brands',
                        localField: 'Brand_id',
                        foreignField: '_id',
                        as: 'brand',
                    },
                },
                { $unwind: '$brand' },
                { $unwind: '$stock' },
                {
                    $match: { $and: [{ 'stock.size': size }, { 'stock.color.name': color.name }] }
                },
                {
                    $project: {
                        brand: '$brand.brand',
                        model: 1,
                        price: 1,
                        gender: 1,
                        stock: 1,
                        image: { $arrayElemAt: ['$image.src', 0] },
                    },
                }
            ]);
        }))

        const shoppingAtributes = {
            User_id: req.locals?.User_id,
            purchase: purchase,
            purchase_date: new Date(),
            payment: 0,
            shipping
        };

        const products = allPurchaseProducts.flat(1)
        const itemsPreference = purchase.map(({ Product_id, quantity }) => {
            const { brand, model, stock, price } = products.find(({ _id }) => Product_id == _id)
            if (stock.quantity < quantity) res.status(400).json(`There is not a stock by ${model} model`)
            shoppingAtributes.payment += price * quantity;
            return {
                title: `${brand} - ${model}`,
                quantity: quantity,
                currency_id: 'USD',
                unit_price: price
            }
        })

        const { init_point, id } = await createOrderMP(itemsPreference);
        shoppingAtributes.preferenceId = id;

        const newShopping = new Shopping(shoppingAtributes);
        const shopping = await newShopping.save();

        if (shopping)
            res.status(201).send({ id });
        else
            res.status(400).json({ "error": "The purchasing process failed" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = createShopping;