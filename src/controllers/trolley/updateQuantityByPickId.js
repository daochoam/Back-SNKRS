const { Trolley } = require('../../schemas/index');

const updateQuantityByPickId = async (req, res) => {
    try {
        const { User_id } = req.locals;
        // const User_id = "6517088344d46facf8d90480";

        const { operation, idPick } = req.params;

        if (operation === "plus" || operation === "less") {
            let pickFound = {};

            let [trolleyBefore] = await Trolley.find({ "User_id": User_id });

            trolleyBefore.pickedProducts.forEach((pick) => {
                if (pick._id == idPick) {
                    pick.quantity = operation === "plus"
                        ? pick.quantity + 1
                        : pick.quantity - 1

                    pickFound = pick;
                }
            })

            if (pickFound) {
                const trolleyAfter = await trolleyBefore.save();

                if (trolleyAfter)
                    res.status(200).json(trolleyAfter.pickedProducts);
                else
                    res.status(400).json({ "erro": "The pick was not updated correctly" });
            }
            else
                res.status(400).json({ "erro": "The pick was not found" });
        }
        else
            res.status(400).json({ error: `The operation -- > ${operation} < --is not valid ` });

} catch (error) {
    res.status(400).json({ error: error.message });
}
};

module.exports = updateQuantityByPickId;
