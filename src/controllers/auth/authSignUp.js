const { User } = require("../../schemas");
const { handlerSendEmailVerify, handlerMailVerifyAccount } = require("../../handlers/auth");
const { generateTokenVerifyMail, sendMail } = require("../../services");
const { config } = require("../../config");

const authSignUp = async (req, res) => {
    const { user, signUp } = req.body;

    try {
        const userCreate = new User(signUp,);
        userCreate.address[0].status = 'active';

        const userSnkrs = await userCreate.save()
        if (userSnkrs) {

            //? SEND EMAIL ACTIVATION
            //? TOKEN VERIFY EMAIL
            const tokenMail = await generateTokenVerifyMail(user)
            //? HANDLER MESSAGE EMAIL ACTIVATION
            const mailActivation = handlerMailVerifyAccount(tokenMail, 'authAccountActivation', '/auth')
            //? SERVICE MAIL SEND
            sendMail(config.MAIL_SNKRS, 'SNKRS', user.email, "Account Activation", mailActivation)


            return res.status(200).json({ message: "The user has been successfully registered, a verification email has been sent!" });
        } else {
            return res.status(200).json({ message: "The user has previously registered" });
        }


    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = authSignUp;