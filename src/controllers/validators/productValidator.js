const { body } = require('express-validator');

exports.createProductValidationRules = [
  body('brand')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Brand is required')
    .isLength({ max: 50 })
    .withMessage('Brand must not exceed 50 characters')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('Brand can only contain letters, numbers, and spaces'),
  body('model')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Model is required')
    .isLength({ max: 50 })
    .withMessage('Model must not exceed 50 characters')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('Model can only contain letters, numbers, and spaces'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a valid number')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive value or zero'),
];

exports.updateProductValidationRules = [
  body('brand')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Brand is required')
    .isLength({ max: 50 })
    .withMessage('Brand must not exceed 50 characters')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('Brand can only contain letters, numbers, and spaces'),
  body('model')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Model is required')
    .isLength({ max: 50 })
    .withMessage('Model must not exceed 50 characters')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('Model can only contain letters, numbers, and spaces'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a valid number')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive value or zero'),
];
