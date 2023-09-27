const { Shopping } = require("../../schemas/index");

const deleteByShoppingId = async ( req, res ) => {
    try {
        const { idShopping } = req.params;

        const shoppingDeleted = await Shopping.findByIdAndDelete(idShopping);

        if (shoppingDeleted)
            res.status(200).json(shoppingDeleted)
        else
            res.status(400).json({ "error": "The purchase was not deleted correctly, please check it" })
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = deleteByShoppingId;