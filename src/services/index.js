const generateTokenVerifyMail = require('./generateTokenVerifyMail')
const sendVerifyMail = require('./sendVerifyEmail')
const replaceHtmlVar = require('./replaceHtmlVar')
module.exports = {
    replaceHtmlVar,
    generateTokenVerifyMail,
    sendVerifyMail
};