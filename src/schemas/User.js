const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (value) => {
                return /^((?!^[._%+-])(?![._%+-]{2,})[a-zñ0-9._%+-]){5,29}[a-zñ0-9]+@(([\w-]+)+\.+[\w-]{2,4})$/.test(value);
            },
            message: ({ value }) => `${value} it is not a valid mail.`
        }
    },
    image: {
        type: String,
    },
    age: {
        type: Number,
        min: 18,
        max: 120,
        validate: {
            validator: (value) => {
                return Number.isInteger(value);
            },
            message: ({ value }) => `${value} no es una edad válida.`
        }
    },
    phone: {
        type: Number,
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },

}, { timestamps: true });

//Creación de modelo
const User = model("User", userSchema);
module.exports = User;