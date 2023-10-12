const { mailTransport, config } = require("../../config");
const replaceHtmlVar = require("../../services/replaceHtmlVar");

const purchaseMailHandler = async (req, res) => {
    const { email, products } = req.body

    const htmlModified = replaceHtmlVar(products);
    const mailOptions = {
        from: config.MAIL_SNKRS,
        to: email,
        subject: 'Compra finalizada',
        text: htmlModified
    };
    mailTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Correo electrónico enviado: ' + info.response);
        }
    });
    res.status(200).json({ message: "Email sent" });
}

module.exports = purchaseMailHandler;