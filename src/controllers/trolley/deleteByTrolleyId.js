const { Trolley } = require("../../schemas/index");

const deleteByTrolleyId = async ( req, res ) => {
    try {
        const { idTrolley } = req.params;
        
        const trolleyDeleted = await Trolley.findByIdAndDelete(idTrolley);

        if(trolleyDeleted){
            res.status(200).json({            
                "trolley_id" : idTrolley,
                "message"    : "Was removed successfully"
            }); 
        }
        else {
            res.status(400).json({ "error": "Something wrong, please check" });
        }
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = deleteByTrolleyId;