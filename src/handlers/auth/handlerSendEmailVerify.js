const { mailTransport } = require("../../config");
const { sendVerifyMail, generateTokenVerifyMail } = require("../../services")


const handlerSendEmailVerify = async (user) => {
    console.log("🚀 ~ file: handlerSendEmailVerify.js:6 ~ handlerSendEmailVerify ~ user:", user)

    const tokenMail = await generateTokenVerifyMail(user)
    const mail = sendVerifyMail(user.email, tokenMail, 'mailActivation', 'auth')
    mailTransport.sendMail(mail);
}

module.exports = handlerSendEmailVerify