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
    },
    shipping: { // guía de la empresa de envío
        type: {
            fist_name: { type: String },
            last_name: { type: String },
            country: { type: String },
            state: { type: String },
            city: { type: String },
            address: { type: String },
            email: { type: String },
            phone: { type: Number },
        }
    },
    payment: { // valor total de la compra
        type: Number,
        required: true,
    },
    purchase_date: {
        type: Date,
    },
    purchase: {
        type: [{
            Product_id: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            color: { type: String },
            size: { type: Number },
            quantity: { type: Number },
            gender: { type: String, enum: ["women", "men", "kids"] },
        }],
        required: true
    },
    orderId: { type: Number },
    preferenceId: { type: String },
    mercadoPagoId: { type: Number },
},
    {
        timestamps: true
    }
);

//Creación de modelo
const Shopping = model("Shopping", shoppingSchema);
module.exports = Shopping;
