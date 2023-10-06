const { Trolley } = require("../../schemas/index")

const removePickedProduct = (idPick, trolley) => {
    let removePick = false;

    const pickedProductsUpdated = trolley.pickedProducts.filter((pick) => {
        if (pick._id == idPick) removePick = true;
        return pick._id != idPick
    });
    trolley.pickedProducts = pickedProductsUpdated;

    if (removePick) return trolley;
    if (!removePick) return false;
};

const updateTrolley = async (req, res) => {
    try {
        const { User_id } = req.locals;
        // const User_id = "6517088344d46facf8d90480";

        const { option } = req.params;

        if (option === "add" || option === "remove") {
            let [trolleyBefore] = await Trolley.find({ "User_id": User_id });

            if(trolleyBefore === undefined){
                const newTrolley = new Trolley({ User_id, pickedProducts: [] });
                trolleyBefore = await newTrolley.save();
            }            

            if (option === "add") {
                const pick = req.body;
                trolleyBefore.pickedProducts.push(pick);
            }
            if (option === "remove") {
                const { idPick } = req.body;
                trolleyBefore = await removePickedProduct(idPick, trolleyBefore);
                if (!trolleyBefore) return res.status(400).json({ "error": "The pick was not found, please ckeck -->idPick<--" });
            }

            const trolleyAfter = await trolleyBefore.save();

            if (trolleyAfter)
                res.status(200).json(trolleyAfter.pickedProducts);
            else
                res.status(400).json({ "error": "Something wrong, please check" });
        }
        else {
            res.status(400).json({ "error": `the option -- > ${option} < --provided is not valid` });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};

module.exports = updateTrolley;
