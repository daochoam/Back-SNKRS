const { addImageStorage } = require("../firebaseStorage/index");
const { User } = require("../../schemas/index");

const updateUserById = async (req, res) => {
    try {
        const { User_id } = req.locals;
        // const User_id = "6520581e26b4e6e173fe621f";

        const newImageUser= req.file;
        const { firstName, lastName, nit, email, birthday, address } = req.body;

        const user = await User.findById(User_id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (nit)       user.nit       = nit;
        if (email)     user.email     = email;
        if (address)   user.address   = address;
        if (birthday)  user.birthday  = birthday;
        if (lastName)  user.lastName  = lastName;
        if (firstName) user.firstName = firstName;
        if (newImageUser) user.image  = await addImageStorage(newImageUser, User_id, "changeImageUser");

        const userUpdated = await user.save();

        res.status(200).json(userUpdated);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = updateUserById;