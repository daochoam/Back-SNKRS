const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    country: {
        type: String,
        required: true,
        unique: true
    },
    ccTLD: {
        type: String,
        required: true,
        unique: true
    },
    phone_code: {
        type: Number,
        required: true,
    },
    flag: {
        type: {
            straight: { type: String },
            wavy: { type: String },
        }
    }
});

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;