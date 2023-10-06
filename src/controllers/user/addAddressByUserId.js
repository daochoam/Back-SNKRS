const { User } = require("../../schemas/index");

const addAddressByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const { address } = req.body;
        const user = await User.findById(id);

        if (!user) return res.status(404).json({ message: "User not found" });

        user.address.push(address);
        await user.save();

        res.status(200).json({ message: "Address added successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = addAddressByUserId;