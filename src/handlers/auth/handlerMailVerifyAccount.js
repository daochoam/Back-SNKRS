const path = require('path');
const fs = require('fs');
const { config } = require('../../config')

const handlerMailVerifyAccount = (token, file, route,) => {
    const bodyMail = path.join(config.MAIL_ROUTE, `${file}.html`);
    const readMail = fs.readFileSync(bodyMail, 'utf8');

    const mailToSend = readMail
        .replace('_ACTIVATION__PATH_', `${config.URL_BACK}${route}`)
        .replace('_ACCOUNT_ACTIVATION_', token);

    return mailToSend;
}
module.exports = handlerMailVerifyAccount