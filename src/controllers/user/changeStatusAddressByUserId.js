const { User } = require("../../schemas/index");

const changeStatusAddressByUserId = async (req, res) => {
    try {
        const { User_id } = req.locals;
        const { idAddress } = req.params;
        const { status } = req.body;

        const user = await User.findById(User_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const addressIndex = user.address.findIndex((address) => address._id.toString() == idAddress);
        if (addressIndex === -1) throw new Error('Address not found');

        user.address[addressIndex].status = status;
        await user.save();

        res.status(200).json({ message: 'Address updated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = changeStatusAddressByUserId;