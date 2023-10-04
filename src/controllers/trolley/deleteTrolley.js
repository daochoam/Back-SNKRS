const { Trolley } = require("../../schemas/index");

const deleteTrolley = async (req, res) => {
    try {
        const { User_id } = req.locals;
        // const User_id = "6514b834a7f6a9231e02193b";

        const [trolleyBefore] = await Trolley.find({ "User_id": User_id })
        const idTrolley = trolleyBefore._id;

        const trolleyDelete = await Trolley.findByIdAndDelete(idTrolley);

        if (trolleyDelete) {
            res.status(200).json({ "message": "Trolley deleted" });
        }
        else {
            res.status(400).json({ "error": "Something wrong, please check" });
        }

    } catch (error) {
        res.status(400).json({ "error": error.message });
    }
};

module.exports = deleteTrolley;
