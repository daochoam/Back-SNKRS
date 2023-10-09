const { User } = require("../../schemas");
const { handlerSendEmailVerify } = require("../../handlers");

const authVerifyEmail = async (req, res) => {
    try {
        const { email } = req.params
        const userSnkrs = await User.findOne({ email })

        if (userSnkrs.status === 'active') {
            return res.status(200).json(userSnkrs);
        }
        else if (userSnkrs.status === 'inactive') {
            await handlerSendEmailVerify(userSnkrs)
            return res.status(200).json(userSnkrs);
        }
        return res.status(404).json("User not found");

    } catch (error) {
        return res.status(400).json("User not found");
    }
};
module.exports = authVerifyEmail 