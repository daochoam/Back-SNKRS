const { Trolley } = require("../../schemas/index");

const updatePickByPickId = async ( req, res ) => {
    try {
        const { attributes }  = req.body;
        const { idPick, idTrolley } = req.body;

        let   pickFound = {};
        const trolleyBefore = await Trolley.findById(idTrolley)
        
        trolleyBefore.pickedProducts.forEach( pick => {
            if (pick._id == idPick){               
                const update = Object.entries(attributes);
                update.forEach( att => pick[att[0]] = att[1] )
                pickFound = pick;
            }            
        });

        if (pickFound){
            const trolleyAfter = await trolleyBefore.save();
    
            if (trolleyAfter)
                res.status(200).json(trolleyAfter);
            else
                res.status(400).json({ "erro": "The pick was not updated correctly" });
        }
        else{
            res.status(400).json({ "error": "The pick was not found, please check the -->idPick<--" });
        }
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = updatePickByPickId;