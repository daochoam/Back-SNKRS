const { Shopping } = require('../../schemas');

const getRecordShoppingsByUsers = async (req, res) => {
    try {
        const matchFilters = {};
        const {
            id, //? Shopping ID
            userId, //? User ID
            nit, //? User NIT
            firstName, //? User First Name
            lastName, //? User Last Name
            email, //? User Email
            color, //? Purchase Color
            status, //? Purchase Status
            payment, //? Purchase Payment
            search //? Search multi field
        } = req.query;
        console.log("🚀 ~ file: getRecordShoppingsByUsers.js:18 ~ getRecordShoppingsByUsers ~ userId:", userId)

        if (req.locals && req.locals.role === 'user') {
            matchFilters.User_id = req.locals.User_id;
        } else if (userId) {
            matchFilters.User_id = userId;
        }

        // if (search) {
        //     matchFilters.status = status;
        //     matchFilters['user.email'] = email;
        //     matchFilters['user.firstName'] = firstName;
        //     matchFilters['user.lastName'] = lastName;
        //     matchFilters['user._id'] = mongoose.Types.ObjectId(id);
        //     matchFilters['user.nit'] = nit;
        //     matchFilters.payment = parseFloat(payment)
        // }
        // else {
        if (status) matchFilters.status = status;
        if (color) matchFilters['purchase.color'] = color;
        if (type) matchFilters['purchase.type'] = type;
        if (category) matchFilters['purchase.category'] = category;
        if (payment) matchFilters.payment = parseFloat(payment)
        // }

        const record = await Shopping.aggregate([
            {
                $lookup: {
                    from: 'shoppings',
                    localField: 'User_id',
                    foreignField: '_id',
                    as: 'shopping',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'User_id',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unwind: "$user",
            },
            {
                $match: matchFilters,
            },
            {
                $group: {
                    _id: "$User_id",
                    user: { $first: "$user" },
                    total_payment: { $sum: "$payment" },
                    record: {
                        $push: {
                            purchase: "$purchase",
                            payment: "$payment",
                            status: "$status",
                            // shipping: "$shipping"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    user: 1,
                    total_payment: 1,
                    record: 1
                }
            }
        ]);

        if (!record) return res.status(404).json('Shopping list not found')
        res.status(200).json(record)

    } catch (error) {
        res.status(500).json('An error occurred');
    }
}

module.exports = getRecordShoppingsByUsers;
