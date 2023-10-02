const app    = require("../../config/firebaseConfig");
const { v4 } = require("uuid");
const { ref, getStorage, uploadBytes, getDownloadURL } = require("firebase/storage");

const addImageStorage = async ( file, refFile = "images" ) => {
    try {
        console.log(file);
        
        return file;
        // const storage = getStorage(app);
        // const idImage = v4();

        // const storageRef = ref(storage, `${refFile}/${idImage}`);
        
        // const fileStorageFirebase = await uploadBytes( storageRef, file );
        // const urlFirebase         = getDownloadURL(storageRef);

        // const image = {
        //     id   : idImage,
        //     src  : urlFirebase,
        //     size : fileStorageFirebase.size,
        //     typeImage : fileStorageFirebase.type,
        // }

        // console.log("addImageStorage-22", image);
        // return image;

    } catch (error) {
        throw new Error(error);
    }
};

module.exports = addImageStorage;