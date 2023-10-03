const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    nit: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    image: {
        type: [
            {
                id: { type: String },
                src: { type: String },
                typeImage: { type: String },
            }
        ]
    },
    birthday: { type: String },
    address: {
        type: [{
            country: { type: String },
            state: { type: String },
            city: { type: String },
            address: { type: String },
            additional: { type: String },
            zip_code: { type: Number },
            phone: { type: Number },
            status: {
                type: String,
                enum: ['active', 'inactive'],
                default: "inactive",
            },
        }]
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

/* 
    ? Verifica si hay una direccion activa, si no la hay o el registro esta vacio, la primera direccion
    ? del registro direcciones queda activa por defecto
*/
userSchema.pre('save', async function (next) {
    const user = this;
    const addressCount = user.address.length;

    if (addressCount === 0) {
        user.address[0].status = 'active';
    } else {
        const hasActiveAddress = user.address.some(address => address.status === 'active');
        if (!hasActiveAddress) {
            user.address[0].status = 'active';
        }
    }
    next();
});


const User = model("User", userSchema);
module.exports = User;