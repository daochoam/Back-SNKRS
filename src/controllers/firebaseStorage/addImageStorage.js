const { v4 } = require("uuid");
const { app } = require("../../config/index");
const { initializeApp } = require("firebase/app");
const { ref, getStorage, uploadBytes, getDownloadURL } = require("firebase/storage");

const imagesToProduct = async ( imagesFiles, colorImages, storage ) => {
    let image = {};
    let indexColor = 0;
    let imagesResponse = [];
    const refFileStorage = "images";

    for (const file of imagesFiles) {
        const idImage    = v4();
        const metadata   = { contentType: file.mimetype };
        const imageToUint8 = new Uint8Array(file.buffer);

        const storageRef = ref(storage, `${refFileStorage}/${idImage}`);       

        const fileStorageFirebase = await (uploadBytes( storageRef, imageToUint8, metadata ));
        const urlFirebase         = await (getDownloadURL(storageRef));

        image = {
            id   : idImage,
            src  : urlFirebase,
            color: colorImages[ indexColor ],
        };

        imagesResponse.push(image);
        indexColor = indexColor + 1;
    }            
    
    return imagesResponse;
}

const changeImage = async ( imageFile, Ref_id, storage, refFileStorage ) => {
    const metadata = { contentType: imageFile.mimetype };
    const imageToUint8 = new Uint8Array(imageFile.buffer);
        
    const storageRef = ref(storage, `${refFileStorage}/${Ref_id}`);

    const fileStorageFirebase = await (uploadBytes( storageRef, imageToUint8, metadata ));
    const urlFirebase         = await (getDownloadURL(storageRef));

    return urlFirebase;
}


const addImageStorage = async ( files, infoExtra, typeImageOperation ) => {
    try {                    
        const storage = getStorage(app);
        let refFileStorage = ""; 
        let responseFirebase;

        if(typeImageOperation === "createProduct"){
            responseFirebase = await imagesToProduct( files, infoExtra, storage );
        }

        if(typeImageOperation === "changeImageProduct"){
            refFileStorage = "images";
            responseFirebase = await changeImage( files, infoExtra, storage, refFileStorage)
        }

        if(typeImageOperation === "changeImageUser"){
            refFileStorage = "avatar"
            responseFirebase = await changeImage( files, infoExtra, storage, refFileStorage )
        }

        return responseFirebase;
 
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = addImageStorage;