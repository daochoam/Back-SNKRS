const { Type } = require("../../schemas");

const getAllTypes = async (req, res) => {
    try {
        const { category, gender } = req.query;

        let filter = {};

        if (category) filter.category = { $regex: new RegExp(category, "i") };
        if (gender) filter.gender = { $in: gender };

        const types = await Type.find(filter);

        if (types.length > 0) {
            res.status(200).json(types);
        } else {
            res.status(404).json('Types not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getAllTypes;
