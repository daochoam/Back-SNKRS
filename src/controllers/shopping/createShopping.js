const { Shopping } = require("../../schemas/index");

const createShopping = async (req, res) => {
    try {
        // const { User_id, firstName, lastName, role } =  req.session.auth;
        const attributes  = req.body;  
        
        //! ----------------- temporal --------
        const firstName= "Pepito";
        const lastName = "Lopez";
        const role     = "user";
        // const role     = "admin";
        // const User_id = 6514b834a7f6a9231e02193b; // Dani / 0 shoppings
        const User_id = "6514587eb7921ff62d216a69"; // 0 shoppings
        // const User_id = "65136ebf2360169a3dedb99c"; // 1 shoppings
        // const User_id = "651439639eefb47285529a1c"; // 2 shoppings      
        //! ----------------- temporal --------
        
        const newShopping = new Shopping({...attributes, User_id});
        const shopping = await newShopping.save();

        if (shopping)
            res.status(201).json(shopping);
        else
            res.status(400).json({ "error": "The purchasing process failed" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = createShopping;