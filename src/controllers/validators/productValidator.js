const { body } = require("express-validator");

exports.createProductValidationRules = [
  body("brand")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Brand is required")
    .isLength({ max: 50 })
    .withMessage("Brand must not exceed 50 characters")
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage("Brand can only contain letters, numbers, and spaces"),
  body("model")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Model is required")
    .isLength({ max: 50 })
    .withMessage("Model must not exceed 50 characters")
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage("Model can only contain letters, numbers, and spaces"),
  body("price")
    .isNumeric()
    .withMessage("Price must be a valid number")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive value or zero"),
  body("image")
    .isArray()
    .withMessage("Image must be an array")
    .notEmpty()
    .withMessage("Image cannot be empty")
    .isArray({ min: 1 })
    .withMessage("At least one image must be provided")
    .custom((images) => {
      return images.every(
        (image) =>
          image.hasOwnProperty("id") &&
          image.hasOwnProperty("src") &&
          image.hasOwnProperty("typeImage") &&
          image.hasOwnProperty("size") &&
          image.hasOwnProperty("color")
      );
    }),
  body("stock")
    .isArray()
    .withMessage("Stock must be an array")
    .notEmpty()
    .withMessage("Stock cannot be empty")
    .isArray({ min: 1 })
    .withMessage("At least one stock item must be provided")
    .custom((stock) => {
      return stock.every(
        (item) =>
          item.hasOwnProperty("size") &&
          item.hasOwnProperty("gender") &&
          item.hasOwnProperty("color") &&
          item.hasOwnProperty("quantity")
      );
    }),
];

exports.updateProductValidationRules = [
  body("brand")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Brand is required")
    .isLength({ max: 50 })
    .withMessage("Brand must not exceed 50 characters")
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage("Brand can only contain letters, numbers, and spaces"),
  body("model")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Model is required")
    .isLength({ max: 50 })
    .withMessage("Model must not exceed 50 characters")
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage("Model can only contain letters, numbers, and spaces"),
  body("price")
    .isNumeric()
    .withMessage("Price must be a valid number")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive value or zero"),
  body("image")
    .optional()
    .isArray()
    .withMessage("Image must be an array")
    .isArray({ min: 1 })
    .withMessage("At least one image must be provided")
    .custom((images) => {
      return images.every(
        (image) =>
          image.hasOwnProperty("id") &&
          image.hasOwnProperty("src") &&
          image.hasOwnProperty("typeImage") &&
          image.hasOwnProperty("size") &&
          image.hasOwnProperty("color")
      );
    }),
  body("stock")
    .optional()
    .isArray()
    .withMessage("Stock must be an array")
    .isArray({ min: 1 })
    .withMessage("At least one stock item must be provided")
    .custom((stock) => {
      return stock.every(
        (item) =>
          item.hasOwnProperty("size") &&
          item.hasOwnProperty("gender") &&
          item.hasOwnProperty("color") &&
          item.hasOwnProperty("quantity")
      );
    }),
];
