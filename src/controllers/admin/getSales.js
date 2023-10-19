const mongoose = require("mongoose");
const { Shopping, Product, User } = require("../../schemas/index");

const searchSales = async (queriesObj) => {
    console.log("queriesObj", queriesObj)
    const shoppings = await Shopping.aggregate([
        //--------------------**match**--------------------
        // {
        //     $match: queriesObj,
        //     // User_id : new mongoose.Types.ObjectId(id),
        //     // queriesObj ? queriesObj : null
        //     // },
        // },
        //--------------------**User**--------------------
        {
            $lookup: {
                from: 'users',
                localField: 'User_id',
                foreignField: '_id',
                as: 'userDetail',
            },
        },
        {
            $unwind: '$userDetail'
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
        //--------------------**Product.brand**--------------------
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

                userInformation : { 
                    $addToSet: {
                        _id: '$userDetail._id',
                        image : '$userDetail.image',
                        email : '$userDetail.email',
                        lastName : '$userDetail.lastName',
                        firstName : '$userDetail.firstName',
                    } 
                },

                purchase: {
                    $push: {
                        _id: '$purchase._id',
                        Product_id: '$purchase.Product_id',
                        brand: '$brand.brand',
                        model: '$productDetail.model',
                        price: '$productDetail.price',
                        quantity: '$purchase.quantity',
                        size: '$purchase.size',
                        color: '$purchase.color',
                        gender: '$purchase.gender',
                        image: {
                            $arrayElemAt: [
                                {
                                    $filter: {
                                        input: '$productDetail.image',
                                        as: 'imageItem',
                                        cond: { $eq: ['$$imageItem.color', '$purchase.color'] }
                                    }
                                },
                                0 // El índice 0 selecciona el primer elemento
                            ]
                        }
                    }
                }
            }
        },       
        //--------------------**project**--------------------
        {
            $project: {
                _id: 0,

                _id: "$_id._id",
                payment: "$_id.payment",
                status: "$_id.status",
                purchase_date: "$_id.purchase_date",
                
                user: "$userInformation",
                purchase: "$purchase",
            }
        }
    ]);

    console.log("shoppings", shoppings.length)

    return shoppings;
};

const getSales = async (req, res) => {
    try {
        const queries = req.query;
        const allSales = await searchSales(queries);

        if(allSales.length > 0){
            res.status(200).json(allSales)
        }
        else { 
            res.status(200).json({"error" : "There are not sales"})
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getSales;