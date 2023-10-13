const { v4 } = require("uuid");
const { initializeApp } = require("firebase/app");
const { ref, getStorage, uploadBytes, getDownloadURL } = require("firebase/storage");

// const { firebase } = require("../../config/firebaseConfig");
// const { applicationDefault } = require('firebase-admin/app');

const addImageStorage = async ( imagesFiles, colorImage, refFileStorage = "images" ) => {
    try {                    
        const firebaseConfig = {
            apiKey: "AIzaSyBqdSo4w-A-p3icO9Ru4ZRBO4eEY68FCsM",
            authDomain: "snkrs-4a559.firebaseapp.com",
            projectId: "snkrs-4a559",
            storageBucket: "snkrs-4a559.appspot.com",
            messagingSenderId: "341444316031",
            appId: "1:341444316031:web:3e6b273044504ca58aa84a"
        };
          
        const app = initializeApp(firebaseConfig);
        const storage    = getStorage(app);        

        let image = {};
        let imagesResponse = [];

        for (const file of imagesFiles) {
            const idImage    = v4();
            const metadata   = { contentType: file.mimetype };
            const imageToUint8 = new Uint8Array(file.buffer);

            // const storageRef = ref(storage, `${refFileStorage}/${idImage}`);
            const storageRef = ref(storage, idImage);
    
            const fileStorageFirebase = await (uploadBytes( storageRef, imageToUint8, metadata ));
            const urlFirebase         = await (getDownloadURL(storageRef));

            image = {
                id   : idImage,
                src  : urlFirebase,
                color: colorImage,
            };

            imagesResponse.push(image);
        }            
        
        return imagesResponse;

    } catch (error) {
        throw new Error(error);
    }
};

module.exports = addImageStorage;