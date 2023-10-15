const { mailTransport } = require('../config')

/**
 * 
 * @param {*} sender activation path
 * @param {*} recipient recipients
 * @param {*} subject account activation link
 * @param {*} message this message is an html format
 * @returns 
 */
const sendMail = (sender, nikName, recipient, subject, messages) => {
    try {
        const mail = {
            from: `${nikName} <${sender}>`,
            to: recipient,
            subject: subject,
            html: messages,
            replyTo: nikName
        };

        //? SEND EMAIL
        mailTransport.sendMail(mail);
        return mail;

    } catch (error) {
        throw new Error(`Error sending mail: ${error}`)
    }
};

module.exports = sendMail;