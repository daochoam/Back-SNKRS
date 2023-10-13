const { addImageStorage } = require("../firebaseStorage/index");
const { User } = require("../../schemas/index");

const updateImage = async (req, res) => {
    try {          
        const imageUser = req.file;
        
        if(imageUser){
            // const { User_id } = req.locals;
            const User_id = "652052d8b9b21219c301202b";

            const newImageUrl = await addImageStorage(imageUser, User_id, "changeImageUser");

            const userBefore = await User.findById(User_id);
            userBefore.image = newImageUrl;

            const userAfter = await userBefore.save();

            if(userAfter) {
                res.status(200).json(userAfter)
            }
            else{
                res.status(400).json({ "error": "The process failed" });
            }
        }
        else{
            res.status(400).json({ "error": "The image file was not received" });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = updateImage;