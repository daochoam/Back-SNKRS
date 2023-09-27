const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const shoppingSchema = new Schema({ 
        User_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ["approved", "rejected", "inProgress"],
            default: "inProgress",
            required: true,
        },
        shipping: { // guía de la empresa de envío
            type: String,
        },
        payment: { // valor total de la compra
            type: Number,
            required: true,
        },
        purchase_date: {
            type: Date,
            required: true,
        },
        purchase: {
            type: [{
                Product_id: {
                    type: Schema.Types.ObjectId,
                    ref : 'Product',
                    required: true,
                },
                color: { type: String },
                size : { type: Number },
                quantity : { type: Number },
                gener    : { type: String, enum: ["female", "male"] },
            }]
        },
        mercadoPago: {
            type: {
                order: { type: String },
                Preference_id : { type: String },
                mercadoPago_id: { type: String },
            }  
        },
    },
    { 
        timestamps: true 
    }
);

//Creación de modelo
const Shopping = model("Shopping", shoppingSchema);
module.exports = Shopping;