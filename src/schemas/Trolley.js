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
                    ref : 'Product',
                    required: true,
                },
                color: { type: String },
                size : { type: Number },
                price: { type: Number },
                quantity : { type: Number },
                gener    : { type: String, enum: ["female", "male", "kid"] },
                image   : {
                    type: [
                      {
                        id  :  { type: String },
                        src :  { type: String },
                        size:  { type: Number },
                        // color: { type: String },
                        typeImage: { type: String },
                      },
                    ],
                },
            }],
            required : true
        },
    },
    {
        timestamps: true
    }
);

//Creación de modelo
const Trolley = model("Trolley", trolleySchema);
module.exports = Trolley;