const mongoose = require("mongoose");
const { Shopping, Product } = require("../../schemas/index");

const filterShoppings = async (queriesObj) => {
    const shoppings = await Shopping.aggregate([
        //--------------------**match**--------------------
        {
            $match: queriesObj,
            // User_id : new mongoose.Types.ObjectId(id),
            // queriesObj ? queriesObj : null
            // },
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
                        price: '$productDetail.price',
                        quantity: '$purchase.quantity',
                        size: '$purchase.size',
                        color: '$purchase.color',
                        gender: '$purchase.gender',
                        // image     : '$productDetail.image',
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

        //! ----------------- temporal solo para pruebas en insomnia --------
        // const firstName= "Pepito";
        // const lastName = "Lopez";
        // const role     = "user";
        // const role     = "admin";
        // const User_id = "651ad453d7f9aabb0ae5f182"; // 115 total
        // const User_id = "6520581e26b4e6e173fe621f"; // 20 total
        // const User_id = "651439639eefb47285529a1c"; // 4 total
        //! ----------------- temporal solo para pruebas en insomnia --------

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