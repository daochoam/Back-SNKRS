const { Review } = require("../../schemas/index");


const getReviewByUser = async (req, res) => {
    try {
        const { product: Product_id } = req.params;
        const User_id = req.locals?.User_id
        if (!User_id || !Product_id) return res.status(400).json({ error: "User_id or Product_id is required" });

        const review = await Review.findOne({ User_id, Product_id }, "-User_id -Product_id -__v").lean();
        res.status(200).json({ review });

    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};
module.exports = getReviewByUser;