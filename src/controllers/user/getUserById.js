const { User } = require("../../schemas/index");

const getUserById = async (req, res) => {
    try {
        const { User_id } = req.locals;
        const user = await User.findById(User_id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getUserById;