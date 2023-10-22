const handlerDateFinishSession = require("./handlerDateFinishSession");
const handlerDecodeTokenIDSession = require("./handlerDecodeTokenIDSession");
const handlerGenerateRandomPassword = require("./handlerGenerateRandomPassword");
const handlerMailResetPassword = require("./handlerMailResetPassword");
const handlerMailVerifyAccount = require("./handlerMailVerifyAccount");
const handlerTokenIdSession = require("./handlerTokenIDSession");
module.exports = {
    handlerDateFinishSession,
    handlerDecodeTokenIDSession,
    handlerTokenIdSession,
    handlerMailResetPassword,
    handlerMailVerifyAccount,
    handlerGenerateRandomPassword
}