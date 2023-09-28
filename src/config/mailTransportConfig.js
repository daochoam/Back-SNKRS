const nodemailer = require('nodemailer');
const config = require('./config');
require("dotenv").config();

// Configuración del transporte de correo (SMTP)
const mailTransport = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    requireTLS: true,
    auth: {
        user: config.MAIL_SNKRS,
        pass: config.PASS_SNKRS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = mailTransport;