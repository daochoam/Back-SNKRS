const { Trolley } = require("../../schemas/index");

const updatePickByPickId = async ( req, res ) => {
    try {
        const { User_id } = req.locals;
        // const User_id = "6517088344d46facf8d90480";
        
        const { idPick } = req.params;
        const attributes = req.body;
    
        let   pickFound = {};
        const [ trolleyBefore ] = await Trolley.find({"User_id": User_id})    

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
                res.status(200).json(pickFound);
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