const { Review } = require("../../schemas/index");


const updateReview = async (req, res) => {
    try {
        const { product: Product_id } = req.query;
        const User_id = req.locals?.User_id

        if (!User_id || !Product_id) return res.status(400).json({ error: "User_id and Product_id is required" });

        const { rating, recommend, aboutSize, opinion, serviceComment } = req.body;

        const update = {}
        if (rating) update.rating = rating;
        if (recommend) update.recommend = recommend;
        if (aboutSize) update.aboutSize = aboutSize;
        if (opinion) update.opinion = opinion;
        if (serviceComment) update.serviceComment = serviceComment;
        const updatedReview = await Review.findOneAndUpdate({ User_id, Product_id }, update, { new: true });

        res.status(201).json({ updatedReview });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};
module.exports = updateReview;