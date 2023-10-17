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
        const { purchase, shipping } = req.body;

        const shoppingAtributes = {
            User_id: req.locals?.User_id || "652ad4959d86982a4774e2dd",
            purchase: purchase,
            purchase_date: new Date(),
            payment: 0,
            shipping
        };

        const validationStockPurchase = await Promise.all(purchase.map(async ({ Product_id, color, quantity, gender, size }) => {
            const product = await Product.findOne({
                _id: Product_id,
                "stock.quantity": { $gte: quantity },
                "stock.color.name": color,
                "stock.size": size,
                gender,
            }, "model price")
                .populate('Brand_id', '-_id brand')
                .lean();

            shoppingAtributes.payment += product.price * quantity;

            if (product) return {
                title: `${product.Brand_id.brand} - ${product.model}`,
                quantity: quantity,
                currency_id: 'USD',
                unit_price: product.price
            }
        }));

        const errorStock = validationStockPurchase.reduce((acc, product, index) => {
            !product && acc.push(purchase[index].Product_id);
            return acc;
        }, []);

        if (errorStock.length) {
            throw Error(`No se cuenta con stock de alguno de los productos seleccionados: ${errorStock}`);
        };

        const { init_point, id } = await createOrderMP(validationStockPurchase);
        console.log(init_point);

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


//! -----------------         Solve Agreggate               -----------------
//! ----------------- CAMBIE EL MODELO PRODCTO MIGUEL  ----------------------
//! ------   CON ESTO DEBERIAS OBTENER CADA PRODUCTO CON SU STOCK     -------
// const Parameters = [
//     {
//         $match: {
//             _id: new mongoose.Types.ObjectId(purchase.Product_id)
//         }
//     },
//     {
//         $unwind: '$products'
//     },
//     {
//         $lookup: {
//             from: 'brands',
//             localField: 'Brand_id',
//             foreignField: '_id',
//             as: 'brand'
//         }
//     },
//     { $unwind: '$stock' },
//     {
//         $match: { //? REVISAR FILRO
//             $and: [
//                 color ? { 'stock.color.name': new RegExp(purchase.color, 'i') } : {},
//                 size ? { 'stock.size': parseFloat(purchase.size) } : {}
//             ]
//         }
//     },
//     {
//         $project: {
//             'brand.brand': '$brand.brand',               //? Brand
//             model: 1,                                    //? Modelo
//             price: 1,                                    //? Precio
//             gender: 1,                                   //? Genero
//             image: { $arrayElemAt: ['$image.src', 0] },  //? Primer imagen almacenada
//             stock: 1,                                    //? Stock Filtado, (VER FILTRO)
//         }
//     }
// ]

//?? NOTA: SE OBTIENEN LAS PROPIEDADES DESCRITAS EN PROJECT DE TODOS LOS PRODUCTOS ADQUIRIDOS POR EL USUARIO, DE CADA MODELO RETORNA SOLA LA COINCIDENCIA COLOR TALLA, ASIGNARLA CAMBIANDO EL VALOR DEL REGEX, METER LO SIGUIENTE EN UN .MAP
// const purchaseProducts = await Product.aggregate(Parameters)