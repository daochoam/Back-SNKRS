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
    image: { type: String },
    birthday: { type: Date },
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
// userSchema.pre('save', async (next) => {
//     const user = this;
//     console.log("🚀 ~ file: User.js:60 ~ userSchema.post ~ user:", user)
//     const addressCount = user.address.length;
//     console.log("🚀 ~ file: User.js:61 ~ userSchema.pre ~ addressCount:", addressCount)

//     if (addressCount === 1) {
//         user.address[0].status = 'active';
//     } else if (addressCount > 1) {
//         const hasActiveAddress = user.address.some(address => address.status === 'active');
//         if (!hasActiveAddress) {
//             user.address[0].status = 'active';
//         }
//     }
//     next();
// });


const User = model("User", userSchema);
module.exports = User;