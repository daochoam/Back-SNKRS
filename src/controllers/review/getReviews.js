const { Review } = require("../../schemas/index");


const getReviews = async (req, res) => {
    try {
        const { user: User_id, product: Product_id } = req.query;
        if (!User_id && !Product_id) return res.status(400).json({ error: "User_id or Product_id is required" });

        if (Product_id) {
            const reviews = await Review.find({ Product_id }, "_id rating opinion").populate("User_id", "firstName image -_id").lean();
            const averageRating = reviews.reduce((total, { rating }) => total + rating, 0) / reviews.length;
            const response = { averageRating, reviews };
            return res.status(200).json(response);
        }
        if (User_id) {
            const reviews = await Review.find({ User_id }, "-User_id -__v").populate("Product_id", "brand model -_id").lean();
            return res.status(200).json({ reviews });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};
module.exports = getReviews;