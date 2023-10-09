const { User } = require("../../schemas");
const { handlerSendEmailVerify } = require("../../handlers");

const authSignUp = async (req, res) => {
    const { user, signUp } = req.body;

    try {
        const userCreate = new User(signUp,);
        userCreate.address[0].status = 'active';

        const userSnkrs = await userCreate.save()
        if (userSnkrs) {
            await handlerSendEmailVerify(user)
            return res.status(200).json({ message: "The user has been successfully registered, a verification email has been sent!" });
        } else {
            return res.status(200).json({ message: "The user has previously registered" });
        }


    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = authSignUp;