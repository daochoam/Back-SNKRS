const { User } = require("../../schemas/index");

const changeStatusByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const user = await User.findOneAndUpdate({ _id: id }, { status }, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = changeStatusByUserId;