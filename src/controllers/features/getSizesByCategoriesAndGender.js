const { Sizes } = require("../../schemas");

const getSizesByCategoriesAndGender = async (req, res) => {
    try {
        const {
            gender = 'men',
            category = 'shoes'
        } = req.query

        const sizes = await Sizes.find({ gender: gender, category: category });
        res.status(200).json(sizes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getSizesByCategoriesAndGender;