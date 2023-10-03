const { Trolley } = require("../../schemas/index");

const createTrolley = async (req, res) => {
    try {
        const attributes  = req.body;
        const newTrolley  = new Trolley(attributes);
        const trolley     = await newTrolley.save();

        if (trolley)
            res.status(201).json(trolley);
        else
            res.status(400).json({ "error": "The pick process failed" });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = createTrolley;