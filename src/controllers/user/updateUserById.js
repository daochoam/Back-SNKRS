const { User } = require("../../schemas/index");

const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, nit, email, image, birthday, address } = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (nit) user.nit = nit;
        if (email) user.email = email;
        if (image) user.image = image;
        if (birthday) user.birthday = birthday;
        if (address) user.address = address;

        await user.save();

        res.status(200).json({ message: 'User updated' });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = updateUserById;