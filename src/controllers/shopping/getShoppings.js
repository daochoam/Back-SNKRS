const mongoose = require("mongoose");
const { Shopping, Product } = require("../../schemas/index");

const filterShoppings = async (queriesObj) => {
    const shoppings = await Shopping.aggregate([
        //--------------------**match**--------------------
        {
            $match: queriesObj,
        },
        //----------**Descomponiendo el purchase de Shopping**--------------------
        {
            $unwind: '$purchase'
        },
        //--------------------**Product**--------------------
        {
            $lookup: {
                from: 'products',
                localField: 'purchase.Product_id',
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
        //--------------------**group**--------------------
        {
            $group: {
                _id: {
                    _id: '$_id',
                    User_id: '$User_id',
                    payment: '$payment',
                    status: '$status',
                    purchase_date: '$purchase_date',
                },

                purchase: {
                    $push: {
                        _id: '$purchase._id',
                        Product_id: '$purchase.Product_id',
                        brand: '$brand.brand',
                        model: '$productDetail.model',
                        gender: '$productDetail.gender',
                        price: '$productDetail.price',
                        quantity: '$purchase.quantity',
                        size: '$purchase.size',
                        color: '$purchase.color',
                        image: { $arrayElemAt: ['$productDetail.image.src', 0] },
                        // image     : '$productDetail.image',
                        // image: {
                        //     $arrayElemAt: [
                        //         {
                        //             $filter: {
                        //                 input: '$productDetail.image',
                        //                 as: 'imageItem',
                        //                 cond: { $eq: ['$$imageItem.color.name', '$purchase.color.name'] }
                        //             }
                        //         },
                        //         0 // El índice 0 selecciona el primer elemento
                        //     ]
                        // }
                    }
                }
            }
        },
        //--------------------**project**--------------------
        {
            $project: {
                _id: 0,

                _id: "$_id._id",
                User_id: "$_id.User_id",
                payment: "$_id.payment",
                status: "$_id.status",
                purchase_date: "$_id.purchase_date",

                purchase: "$purchase"
            }
        }
    ]);

    return shoppings;
};

const getShoppings = async (req, res) => {
    try {
        const { User_id, firstName, lastName, role } = req.locals;
        let queriesObj = req.query;
        let allShoppings = [];

        if (role === "user") {
            queriesObj.User_id = new mongoose.Types.ObjectId(User_id);
            allShoppings = await filterShoppings(queriesObj);
        }
        if (role === "admin") allShoppings = await filterShoppings(queriesObj);

        if (allShoppings.length > 0)
            res.status(200).json(allShoppings)
        else
            // res.status(200).json([])
            res.status(404).json({ "message": `There are no purchases recorded for ${firstName} ${lastName}, please check it` })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getShoppings;