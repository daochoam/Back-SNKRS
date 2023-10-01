const { body } = require("express-validator");
const { validationResult } = require("express-validator");

let validateAttributes = { };

const validateShopping = {
    status:        
        body("status")
        .custom( (status) => {
            const validStatus = ["approved", "rejected", "inProgress"];

            if(status !== undefined){
                if (!validStatus.includes(status)) {
                    throw new Error(`--> ${ status } <-- status is not valid`);
                }
                else  return true;
            }
            else return true;
        }),
    payment:
        body("payment")
        .notEmpty().withMessage("The purchase -->payment<-- field cannot be empty").bail()
        .isNumeric().withMessage("The type of -->payment<-- data must be numerical.").bail(),
    purchase:
        body("purchase")
        .notEmpty().withMessage("The -->purchase<-- cannot be empty").bail()
        .isArray().withMessage('The -->purchase<-- should be an array').bail()
};

validateAttributes.first = [
    validateShopping.payment,
    validateShopping.status,
    validateShopping.purchase,
];

validateAttributes.second = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
};

module.exports = validateAttributes;