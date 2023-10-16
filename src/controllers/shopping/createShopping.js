const mongoose = require("mongoose");
const { Shopping, Product } = require("../../schemas/index");
const createOrderMP = require('../../services/createOrderMP');

//! Ejemplo de datos que deben llegar por body
// const body = {
//     purchase: [{
//         Product_id: "6514399dc99185f470cb855e",
//         quantity: 9,
//         size: 43.5,
//         color: "white",
//         gender: "male"
//     }],
//     shipping: {
//         fist_name: "Pepito",
//         last_name: "Lopez",
//         country: "Argentina",
//         state: "Buenos Aires",
//         city: "CABA",
//         address: "Calle 123",
//         email: "correo@gmail.com",
//         phone: 123456789,
//     },
// };

const createShopping = async (req, res) => {
    try {
        // const { User_id, firstName, lastName, role } =  req.session.auth;
        // const attributes  = req.body;
        const { purchase, shipping } = req.body;
        //! ----------------- temporal --------
        // const firstName= "Pepito";
        // const lastName = "Lopez";
        // const role     = "user";
        // const role     = "admin";
        // const User_id = 6514b834a7f6a9231e02193b; // Dani / 0 shoppings
        // const User_id = "6514587eb7921ff62d216a69"; // 0 shoppings
        // const User_id = "65136ebf2360169a3dedb99c"; // 1 shoppings
        // const User_id = "651439639eefb47285529a1c"; // 2 shoppings
        //! ----------------- temporal --------

        //! -----------------         Solve Agreggate               -----------------
        //! ----------------- CAMBIE EL MODELO PRODCTO MIGUEL  ----------------------
        //! ------   CON ESTO DEBERIAS OBTENER CADA PRODUCTO CON SU STOCK     -------
        const Parameters = [
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(Product_id)
                }
            },
            {
                $unwind: '$products'
            },
            {
                $lookup: {
                    from: 'brands',
                    localField: 'Brand_id',
                    foreignField: '_id',
                    as: 'brand'
                }
            },
            { $unwind: '$stock' },
            {
                $match: { //? REVISAR FILRO
                    $and: [
                        color ? { 'stock.color.name': new RegExp(color, 'i') } : {},
                        size ? { 'stock.size': parseFloat(size) } : {}
                    ]
                }
            },
            {
                $project: {
                    'brand.brand': '$brand.brand',               //? Brand
                    model: 1,                                    //? Modelo
                    price: 1,                                    //? Precio
                    gender: 1,                                   //? Genero
                    image: { $arrayElemAt: ['$image.src', 0] },  //? Primer imagen almacenada
                    stock: 1,                                    //? Stock Filtado, (VER FILTRO)
                }
            }
        ]

        //?? NOTA: SE OBTIENEN LAS PROPIEDADES DESCRITAS EN PROJECT DE TODOS LOS PRODUCTOS ADQUIRIDOS POR EL USUARIO, DE CADA MODELO RETORNA SOLA LA COINCIDENCIA COLOR TALLA, ASIGNARLA CAMBIANDO EL VALOR DEL REGEX, METER LO SIGUIENTE EN UN .MAP 
        const purchaseProducts = await Product.aggregate(Parameters)

        const shoppingAtributes = {
            User_id: req.locals?.User_id,
            purchase: purchase,
            purchase_date: new Date(),
            payment: 0,
            shipping
        };

        const itemsPreference = await Promise.all(purchase.map(async (product) => {
            const { brand, model, price, stock } = await Product.findById(product.Product_id, { image: 0, category: 0, type: 0, __v: 0 }).lean();
            shoppingAtributes.payment += price * product.quantity;
            return {
                title: `${brand} - ${model}`,
                quantity: product.quantity,
                currency_id: 'USD',
                unit_price: price
            }
        }))

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