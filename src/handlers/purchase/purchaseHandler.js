const { mailTransport, config } = require("../../config");
const replaceHtmlVar = require("../../services/replaceHtmlVar");

const purchaseMailHandler = async (email, name, total, products) => {
// const { email, name, total, products } = req.body

    const htmlModified = await replaceHtmlVar({ name, total }, products);

    const mailOptions = {
        from: config.MAIL_SNKRS,
        to: email,
        subject: 'Compra finalizada',
        html: htmlModified
    };
    mailTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).json({ message: "Email not sent" });
        } else {
            console.log('Correo electrónico enviado: ' + info.response);
            res.status(200).json({ message: "Email sent" });
        }
    });
}

module.exports = purchaseMailHandler;