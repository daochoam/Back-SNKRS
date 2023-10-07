const { User, Shopping } = require('../schemas')

const generateTokenVerifyPurchase = async (email, Shopping_id) => {
    try {
        const user = await Shopping.find({ _id: Shopping_id, User_idemail: email })

        if (!user.emailVerified || userSnkrs.status === 'inactive') {
            const actionCodeSettings = {
                url: URL_FRONT,
                handleCodeInApp: true,
            };
            const authFirebaseToken =
                await firebase
                    .auth()
                    .generateEmailVerificationLink(user.email, actionCodeSettings);

            const token = jwt.sign({
                email: user.email,
                activation: authFirebaseToken
            }, JWT_MAIL, { expiresIn: '7d' });
            return token;

        } else {
            throw new Error('The email is already verified.');
        }
    } catch (error) {
        console.log(error.message);
        throw new error.message;
    };

}

module.exports = generateTokenVerifyPurchase