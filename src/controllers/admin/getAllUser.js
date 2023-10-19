const { User } = require("../../schemas/index");

const getAllUser = async (req, res) => {
    try {
        const { firstName, email, country, status } = req.query;
        const query = {};
        const sort = {};
        if (country) query["address.0.country"] = new RegExp(country, 'i');
        if (status) query.status = status
        if (firstName) sort.firstName = firstName;
        if (email) sort.email = email;

        const users = await User.find(query).sort(sort);
        console.log("users", users.length)

        res.status(200).json(users);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getAllUser;