const { mailTransport } = require("../../config");
const { sendVerifyMail, generateTokenVerifyPurchase } = require("../../services")


const handlerSendEmailPurchase = async (user) => {

    const tokenMail = await generateTokenVerifyPurchase(user)
    const mail = sendPurchaseMail(user.email, tokenMail, 'mailActivation', '/user/auth')
    mailTransport.sendMail(mail);
}

module.exports = handlerSendEmailPurchase