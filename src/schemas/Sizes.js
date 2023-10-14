const { Schema, model } = require("mongoose");

const sizeSchema = new Schema({
    gender: {
        type: String,
        enum: ['men', 'women', 'kids'],
        required: true,
    },
    category: {
        type: String,
        enum: ['clothes', 'shoes', 'accessories'],
        required: true,
    },
    size: { type: String || Number },
    measurements: {
        US: {
            type: Number,
            validate: {
                validator: function () {
                    return this.category === 'shoes';
                },
                message: 'US is only allowed for shoes products',
            },
        },
        EUR: {
            type: Number,
            validate: {
                validator: function () {
                    return this.category === 'shoes';
                },
                message: 'EUR is only allowed for shoes products',
            },
        },
        UK: {
            type: Number,
            validate: {
                validator: function () {
                    return this.category === 'shoes';
                },
                message: 'UK is only allowed for shoes products',
            },
        },
        cm: {
            type: Number,
            validate: {
                validator: function () {
                    return this.category === 'shoes';
                },
                message: 'cm is only allowed for shoes products',
            },
        },
        inch: {
            type: Number,
            validate: {
                validator: function () {
                    return this.category === 'shoes';
                },
                message: 'inch is only allowed for shoes products',
            },
        },
        chest_cm: {
            type: Number,
            validate: {
                validator: function () {
                    return this.category === 'shirt';
                },
                message: 'chest_cm is only allowed for shirt products',
            },
        },
        chest_inch: {
            type: Number,
            validate: {
                validator: function () {
                    return this.category === 'shirt';
                },
                message: 'chest_inch is only allowed for shirt products',
            },
        },
        waist_cm: {
            type: Number,
            validate: {
                validator: function () {
                    return this.category === 'shirt';
                },
                message: 'waist_cm is only allowed for shirt products',
            },
        },
        waist_inch: {
            type: Number,
            validate: {
                validator: function () {
                    return this.category === 'shirt';
                },
                message: 'waist_inch is only allowed for shirt products',
            },
        },
        hip_cm: {
            type: Number,
            validate: {
                validator: function () {
                    return this.category === 'shirt';
                },
                message: 'hip_cm is only allowed for shirt products',
            },
        },
        hip_inch: {
            type: Number,
            validate: {
                validator: function () {
                    return this.category === 'shirt';
                },
                message: 'hip_inch is only allowed for shirt products',
            },
        },
        material: {
            type: String,
            validate: {
                validator: function () {
                    return this.category === 'accessories';
                },
                message: 'Material is only allowed for accessories products',
            },
        },
    }
})

const Sizes = model("Sizes", sizeSchema);

module.exports = Sizes;
