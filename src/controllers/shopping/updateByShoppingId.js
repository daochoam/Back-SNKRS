const { Shopping } = require("../../schemas/index");

const updateByShoppingId = async (req, res) => {
    try {
        const update  = req.body;
        const { idShopping } = req.params;

        const shoppingBefore = await Shopping.findById(idShopping);
        
        for (const attribute in update) {
            shoppingBefore[attribute] = update[attribute]
        }

        const shoppingUpdated = await shoppingBefore.save()               

        if (shoppingUpdated)
            res.status(200).json(shoppingUpdated)
        else
            res.status(400).json({ "error": "The purchase was not updated correctly, please check it" })
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = updateByShoppingId;