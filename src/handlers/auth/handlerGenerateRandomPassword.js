const crypto = require('crypto');

const handlerGenerateRandomPassword = (length = 15) => {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    const randomBytes = crypto.randomBytes(length);

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = randomBytes[i] % characters.length;
        password += characters.charAt(randomIndex);
    }
    return password; s
}

module.exports = handlerGenerateRandomPassword