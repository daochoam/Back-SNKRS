const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    country: { type: String },
    flag: { type: String },
    capital: { type: String },
    nationality: { type: String },
    timeZone: { type: String },
    location: {
        latitude: { type: String },
        longitude: { type: String },
    },
    codes: {
        iso2: { type: String },
        iso3: { type: String },
        tld: { type: String },
        numeric: { type: String },
        phone: { type: String },
    },
    currency: {
        name: { type: String },
        abbreviation: { type: String },
        symbol: { type: String },
    },
    emojiU: { type: String },
});

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;