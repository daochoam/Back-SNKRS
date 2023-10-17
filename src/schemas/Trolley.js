const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const trolleySchema = new Schema({
    User_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true,
    },
    pickedProducts: {
        type: [{
            Product_id: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            size: { type: Number },
            price: { type: Number },
            quantity: { type: Number },
            color: {
                name: { type: String },
                html: { type: String }
            },
            gender: { type: String, enum: ["women", "men", "kids"] },
            image: { type: String }
        }],
        required: true
    },
},
    {
        timestamps: true
    }
);

//Creación de modelo
const Trolley = model("Trolley", trolleySchema);
module.exports = Trolley;