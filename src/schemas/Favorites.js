const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const favoritesSchema = new Schema({
    User_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    favorites: [{
        type: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        }
    }]
},
    {
        timestamps: true
    }
);

//Creación de modelo
const Favorites = model("Favorites", favoritesSchema);
module.exports = Favorites;
