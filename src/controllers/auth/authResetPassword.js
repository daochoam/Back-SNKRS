const { URL_FRONT } = require("../../config/config");
const path = require('path');
const { User } = require("../../schemas");
const { firebase } = require("../../config");

const authResetPassword = async (req, res) => {
    app.post('/reset-password', (req, res) => {
        const email = req.body.email;

        const actionCodeSettings = {
            url: path.join(URL_FRONT, '/reset-password'),
            handleCodeInApp: true,
        };

        firebase.auth().generatePasswordResetLink(email,)
        generatePasswordResetLink(email)
            .then((link) => {
                res.send(`Enlace de restablecimiento de contraseña: ${link}`);
            })
            .catch((error) => {
                res.status(500).send(`Error: ${error.message}`);
            });
    });
}
module.exports = authResetPassword