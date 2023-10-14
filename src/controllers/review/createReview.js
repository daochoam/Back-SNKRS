const { Review, Product, User } = require("../../schemas/index");

const createReview = async (req, res) => {
    try {
        const { Product_id, rating, recommend, aboutSize, opinion, serviceComment } = req.body;
        const User_id = req.locals?.User_id

        const reviewed = await Review.findOne({ User_id, Product_id });
        if (reviewed) {
            return res.status(400).json({ error: "You have already reviewed this product" });
        }

        const review = await Review.create({
            User_id, Product_id, rating, recommend, aboutSize, opinion, serviceComment
        });

        // const product = await Product.findById(Product_id);
        // const user = await User.findById(User_id);
        // product.reviews.push(review._id);
        // user.reviews.push(review._id);
        // await product.save();
        // await user.save();
        res.status(201).json({ review });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};
module.exports = createReview;