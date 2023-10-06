const { Trolley } = require("../../schemas/index");

const getTrolleyByUserId = async (req, res) => {
    try {

        const { User_id } = req.locals;

        const [trolley] = await Trolley.find({ User_id });

        if (trolley)
            res.status(200).json(trolley.pickedProducts);
        else
            res.status(200).json({ "message": "The User does not have a products pick" });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getTrolleyByUserId;