const { Trolley } = require("../../schemas/index");

const getTrolleyByUserId = async (req, res) => {
    try {
        const { idUser }  = req.params;
        const [ trolley ] = await Trolley.find({User_id : idUser});

        if (trolley)
            res.status(200).json(trolley);
        else
            res.status(200).json({ "message": "The User does not have a products pick" });
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getTrolleyByUserId;