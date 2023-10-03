const { mailTransport } = require("../../config");
const { sendVerifyMail, generateTokenVerifyMail } = require("../../services")


const handlerSendEmailVerify = async (user) => {

    const tokenMail = await generateTokenVerifyMail(user)
    console.log("🚀 ~ file: handlerSendEmailVerify.js:8 ~ handlerSendEmailVerify ~ tokenMail:", tokenMail)
    const mail = sendVerifyMail(user.email, tokenMail, 'mailActivation', '/user/auth')
    console.log("🚀 ~ file: handlerSendEmailVerify.js:10 ~ handlerSendEmailVerify ~ mail:", mail)
    mailTransport.sendMail(mail);
}

module.exports = handlerSendEmailVerify