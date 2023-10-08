const { Schema, model } = require("mongoose");

const shoppingSchema = new Schema({ 
        User_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: [ "approved", "rejected", "inProgress" ],
            default: "inProgress",
        },
        payment: { // valor total de la compra
            type: Number,
            required: true,
        },
        shipping     : { type: String },// guía de la empresa de envío
        purchase_date: { type: Date },    
        orderId      : { type: Number },
        preferenceId : { type: String },
        mercadoPagoId: { type: Number },
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
                gener    : { 
                    type: String, 
                    enum: ["female", "male", "kid"] 
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
const Shopping = model("Shopping", shoppingSchema);
module.exports = Shopping;
