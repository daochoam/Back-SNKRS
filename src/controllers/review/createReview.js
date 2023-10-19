const { Review } = require("../../schemas/index");

const createReview = async (req, res) => {
    try {
        const { Product_id, rating, recommend, aboutSize, opinion, serviceComment } = req.body;
        const User_id = req.locals?.User_id

        const reviewed = await Review.findOne({ User_id, Product_id });
        if (reviewed) {
            const update = {}
            update.User_id = User_id;
            update.Product_id = Product_id;
            if (rating) update.rating = rating;
            if (recommend) update.recommend = recommend;
            if (aboutSize) update.aboutSize = aboutSize;
            if (opinion) update.opinion = opinion;
            if (serviceComment) update.serviceComment = serviceComment;
            const reviewed = await Review.findOneAndUpdate({ User_id, Product_id }, update, { new: true });
            return res.status(201).json({ reviewed });

        }

        const review = await Review.create({
            User_id, Product_id, rating, recommend, aboutSize, opinion, serviceComment
        });
        res.status(201).json({ review });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};
module.exports = createReview;