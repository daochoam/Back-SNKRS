const { Trolley } = require("../../schemas/index");

const emptyTrolley = async ( req, res ) => {
    try {
        // const { User_id } = req.locals;
        const User_id = "6514b834a7f6a9231e02193b";
        
        const [ trolleyBefore ] = await Trolley.find({"User_id" : User_id});        
        trolleyBefore.pickedProducts = [];        

        const trolleyAfter = await trolleyBefore.save();

        if(trolleyAfter){
            res.status(200).json(trolleyAfter.pickedProducts);
        }
        else {
            res.status(400).json({ "error": "Something wrong, please check" });
        }
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = emptyTrolley;