const { Trolley, Product } = require("../../schemas/index");

const createTrolley = async (req, res) => {
    try {
        const { User_id } = req.locals;
        // const User_id = "6517088344d46facf8d90480";

        const pickedProducts = req.body;

        const newTrolley = new Trolley({ User_id, pickedProducts });
        const trolley = await newTrolley.save();

        if (trolley)
            res.status(201).json(trolley.pickedProducts);
        else
            res.status(400).json({ "error": "The pick process failed" });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = createTrolley;