const mongoose = require("mongoose");
const { Shopping } = require("../../schemas/index");

const filterShoppings = async ( id, typeId = "User_id" ) => {
    const shoppings = await Shopping.aggregate([
        //--------------------**match**--------------------
        { 
            $match: { [ typeId ]: new mongoose.Types.ObjectId(id) } 
        },
        //--------------------**project**--------------------
        {
            $project : {
                // _id      : 0,
                User_id  : 0,
                // status   : 1,
                shipping : 0,
                // payment  : 1,
                // purchase_date: 1,
                purchase : {
                    Product_id : 0,
                    // quantity   : 1,
                    // color : 1,
                    // size  : 1,
                    // gener : 1,
                },
                mercadoPago : 0,
                // mercadoPago : {
                //     order: 0,
                    // preference_id: 1,
                    // mercadoPago_id: 1,
                // }
                createdAt: 0, 
                updatedAt: 0,
                __v : 0
            }
        }
    ]);

    return shoppings;
};

const getShoppings = async (req, res) => {
    try {
        const { User_id, firstName, lastName, role } =  req.locals;
        let queriesObj   = req.query;
        let allShoppings = [];
        
        //! ----------------- temporal solo para pruebas en insomnia --------
        // const firstName= "Pepito";
        // const lastName = "Lopez";
        // const role     = "user";
        // const role     = "admin";
        // const User_id = "6514587eb7921ff62d216a69"; // 0 shoppings
        // const User_id = "65136ebf2360169a3dedb99c"; // 1 shoppings
        // const User_id = "651439639eefb47285529a1c"; // 2 shoppings      
        //! ----------------- temporal solo para pruebas en insomnia --------

        if(role === "user"){
            queriesObj.User_id = User_id;
            allShoppings = await Shopping.find(queriesObj)
        } 
        if(role === "admin") allShoppings = await Shopping.find(queriesObj)                

        if (allShoppings.length > 0)
            res.status(200).json(allShoppings)
        else
            res.status(200).json({ "message": `There are no purchases recorded for ${firstName} ${lastName}, please check it` })        
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getShoppings;