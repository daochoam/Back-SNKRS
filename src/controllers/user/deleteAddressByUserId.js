const { User } = require("../../schemas/index");

const deleteAddressByUserId = async (req, res) => {
    try {
        const { id: userId, idAddress } = req.params;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        const addressIndex = user.address.findIndex(
            (address) => address._id.toString() === idAddress
        );
        if (addressIndex === -1) return res.status(404).json({ message: "Address not found" });

        user.address.splice(addressIndex, 1);
        await user.save();
        res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = deleteAddressByUserId;

module.exports = deleteAddressByUserId;