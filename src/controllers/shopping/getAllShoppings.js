const { Shopping } = require("../../schemas/index");

const getAllShoppings = async ( req, res ) => {
    try {
        const allShoppings = await Shopping.findAll();

        if (allShoppings)
            res.status(201).json(allShoppings);
        else
            res.status(200).json({ "error": "There are no purchases registered in the database" });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getAllShoppings;