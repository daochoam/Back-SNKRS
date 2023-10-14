const { Schema, model } = require("mongoose");

const colorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  rgb: {
    type: String,
    unique: true,
    trim: true,
    validate: {
      validator: function (value) {
        const rgbValues = value.split(',').map(val => parseInt(val.trim()));
        return rgbValues.length === 3 &&
          rgbValues.every(val => !isNaN(val) && val >= 0 && val <= 255);
      },
      message: 'RGB color must be in the format "255, 255, 255" with values in the range of 0 to 255.'
    }
  },
  hsv: {
    type: String,
    unique: true,
    trim: true,
    validate: {
      validator: function (value) {
        const hsvValues = value.split(',').map(val => parseFloat(val.trim()));
        return (
          hsvValues.length === 3 &&
          hsvValues.every(val => !isNaN(val) && val >= 0 && val <= 360)
        );
      },
      message: 'HSV color must be in the format "0, 0, 100" with values in the correct range.'
    }
  },
  html: {
    type: String,
    unique: true,
    trim: true,
    validate: {
      validator: function (value) {
        return /^#([A-Fa-f0-9]{6})$/.test(value);
      },
      message: 'HTML color must be in the format "#RRGGBB".'
    }
  },
});

const Colors = model("Colors", colorSchema);

module.exports = Colors;
