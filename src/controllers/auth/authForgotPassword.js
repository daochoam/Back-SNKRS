const { URL_FRONT } = require("../../config/config");
const path = require('path');
const { User } = require("../../schemas");
const { firebase } = require("../../config");

const authForgotPassword = async (req, res) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email: email })
        if (!user) res.status(404).json('User not found')

        const actionCodeSettings = {
            url: path.join(URL_FRONT, '/reset-password'),
            handleCodeInApp: true,
        };


    } catch (error) {

    }
}

module.exports = authForgotPassword