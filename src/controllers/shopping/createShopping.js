const { Shopping } = require("../../schemas/index");

const createShopping = async (req, res) => {
    try {
        const attributes  = req.body;       
        
        const newShopping = new Shopping(attributes);
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