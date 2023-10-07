const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    idCountry: {
        type: Schema.Types.ObjectId, ref: "Country"
    },
    country: { type: String },
    states: [String]
});

const State = mongoose.model('State', stateSchema);
module.exports = State;