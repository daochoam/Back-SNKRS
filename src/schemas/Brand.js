const { Schema, model } = require("mongoose");

const brandSchema = new Schema({
    brand: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    image: {
        type:
        {
            id: { type: String },
            src: { type: String },
        },
    },
    website: { type: String },
    email: { type: String },
    phone: { type: String },
});

const Brand = model('Brand', brandSchema);

module.exports = Brand;