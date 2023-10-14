const { Sizes } = require("../../schemas/index");
const shoes = require("../../assets/Shoes.json");

const shoesData = shoes.map((item) => {
    return {
        gender: item.gender,
        category: item.category,
        size: item.US,
        measurements: {
            US: item.US,
            EUR: item.EUR,
            UK: item.UK,
            cm: item.cm,
            inch: item.inch
        }
    };
});

const bulkShoes = async (req, res) => {
    try {
        const result = await Sizes.insertMany(shoesData);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = bulkShoes;