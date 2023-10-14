const { addImageStorage } = require("../firebaseStorage/index");
const { Product } = require("../../schemas/index");

const updateImageProduct = async (req, res) => {
  try {
    const isImage = req.file;

    if(isImage){
      const newImageUrl = await addImageStorage(isImage, req.params.Image_id, "changeImageProduct");
      
      // let productBefore = Product.findById(req.params.Product_id);
      // productBefore.image.map((imageObj)=>{
      //   if( imageObj.id === req.params.Image_id ) imageObj.src = newImageUrl;
      // })

      res.status(200).json(newImageUrl);
    }
    else{
      res.status(400).json({ "error": "The image file was not received" });
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateImageProduct;
