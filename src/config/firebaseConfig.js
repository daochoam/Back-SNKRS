require("dotenv").config();
const { applicationDefault } = require('firebase-admin/app');
const firebase = require('firebase-admin');

firebase.initializeApp({
    credential: applicationDefault()
});

module.exports = firebase;