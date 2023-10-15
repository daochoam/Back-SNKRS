const authActiveAccount = require("./authActiveAccount");
const authResetPassword = require("./authResetPassword");
const authSignIn = require("./authSignIn");
const authSignOut = require("./authSignOut");
const authSignUp = require("./authSignUp");
const authUpdatePassword = require("./authUpdatePassword");
const authUpdateSession = require("./authUpdateSession");
const authVerifyEmail = require("./authVerifyEmail");
const authVerifySession = require("./authVerifySession");


module.exports = {
    authActiveAccount,
    authSignIn,
    authSignOut,
    authSignUp,
    authUpdateSession,
    authVerifyEmail,
    authVerifySession,
    authResetPassword,
    authUpdatePassword
}