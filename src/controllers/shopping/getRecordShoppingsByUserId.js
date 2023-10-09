const mongoose = require("mongoose");
const { Shopping } = require('../../schemas')

const getRecordListByUserId = async (req, res) => {
    const id = req.query

    try {
        const Record = await Shopping.aggregate([
            { $match: { User_id: new mongoose.Types.ObjectId(id) } },
            //--------------------**Hotel**--------------------
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
                $group: {
                    _id: "$User_id",
                    user: { $first: "$user" },
                    record: {
                        $push: {
                            purchase: "$purchase",
                            payment: "$payment",
                            status: "$status",
                            shipping: "$shipping"
                        }
                    }
                }
            }
        ])

        return res.status(200).json(Record);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = getRecordListByUserId