const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    Country_id: {
        type: Schema.Types.ObjectId,
        ref: 'Countries',
        require: true
    },
    states: {
        type: [
            {
                state_name: { type: String }
            }
        ]
    }
});

const State = mongoose.model('State', stateSchema);
module.exports = State;