const { Type, Category } = require('../../schemas');

const getTypes = async (req, res) => {
    try {
        const { category } = req.query;
        console.log("Category:", category);

        const filter = {};
        if (category) {
            const { _id } = await Category.findOne({ category: new RegExp(category, 'i') });
            if (_id) {
                filter.Category_id = _id;
            }
        }

        console.log("Filter:", filter);
        const types = await Type.find(filter);
        console.log("Types:", types);

        if (types.length > 0) {
            res.status(200).json(types);
        } else {
            res.status(404).json({ error: 'No types found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getTypes;