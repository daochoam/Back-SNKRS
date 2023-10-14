require('dotenv').config();
const { initializeApp } = require("firebase/app");

const { apiKey, authDomain,
    projectId,  storageBucket,
    messagingSenderId, appId 
} = process.env;

const app = initializeApp({
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
});

module.exports = app;