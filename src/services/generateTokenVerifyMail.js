const jwt = require('jsonwebtoken');
const { firebase, config: { JWT_MAIL, URL_FRONT } } = require('../config')
const { User } = require("../schemas")

const generateTokenVerifyMail = async (user) => {

    try {
        const userSnkrs = await User.findOne({ email: user.email })

        if (!user.emailVerified || userSnkrs.status === 'inactive') {
            const actionCodeSettings = {
                url: URL_FRONT,
                handleCodeInApp: true,
            };
            const authFirebaseToken =
                await firebase
                    .auth()
                    .generateEmailVerificationLink(user.email, actionCodeSettings);
            console.log("🚀 ~ file: generateTokenVerifyMail.js:22 ~ generateTokenVerifyMail ~ authFirebaseToken:", authFirebaseToken)

            const token = jwt.sign({
                email: user.email,
                activation: authFirebaseToken
            }, JWT_MAIL, { expiresIn: '7d' });
            return token;

        } else {
            throw new Error('The email is already verified.');
        }
    } catch (error) {
        console.log(error.message);
        throw new error.message;
    };
};

module.exports = generateTokenVerifyMail;