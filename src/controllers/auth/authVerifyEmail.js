const { User } = require("../../schemas");
const { handlerSendEmailVerify } = require("../../handlers");

const authVerifyEmail = async (req, res) => {
    const { email } = req.params
    try {
        const userSnkrs = User.findOne({ email })
        if (userSnkrs.status === 'active') {
            return res.status(200).json(userSnkrs);
        }
        else if (userSnkrs.status === 'inactive') {
            await handlerSendEmailVerify(userSnkrs)
            return res.status(200).json(userSnkrs);
        }
    } catch (error) {
        return res.status(400).json("User not found");
    }
};
module.exports = authVerifyEmail 