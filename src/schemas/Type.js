const { Schema, model } = require("mongoose");

const typeSchema = new Schema({
    Category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Type',
        required: true,
    },
    category: { type: String },
    type: {
        type: String,
    },
    gender: [{
        type: String,
        enum: ["men", "women", "kids"],
    }],
});

const Type = model('Type', typeSchema);
module.exports = Type;