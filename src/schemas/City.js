const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
    country: { type: String },
    state: { type: String },
    cities: [String]
});

const City = mongoose.model('City', citySchema);
module.exports = City;