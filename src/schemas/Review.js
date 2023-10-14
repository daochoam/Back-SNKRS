const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    User_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    Product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        max: 5,
        min: 1
    },
    recommend: {
        type: Boolean,
    },
    aboutSize: {
        type: String,
        enum: ["small", "fine", "big"]
    },
    opinion: { type: String },
    serviceComment: { type: String },

});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;