const { addImageStorage } = require("../firebaseStorage/index");
const { Product } = require("../../schemas/index");

const updateImageProduct = async (req, res) => {
  try {
    const imagesFiles = req.files;
    const { imagesColors } = req.body;

    if (imagesFiles.length > 0) {
      const imagesShoes = await addImageStorage(imagesFiles, imagesColors, "createProduct");
      const productBefore = await Product.findById(req.params.id);
      productBefore.image = imagesShoes;

      const productAfter = await productBefore.save();
      if (imagesShoes && productAfter) res.status(200).json(true)
    }
    else {
      res.status(400).json({ "error": "The image file was not received" });
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateImageProduct;
