const { User } = require("../../schemas");
const { handlerSendEmailVerify } = require("../../handlers");

const authVerifyEmail = async (req, res) => {
    const { email } = req.params
    try {
        const userSnkrs = User.findOne({ email, status: 'inactive' })
        if (userSnkrs) {
            await handlerSendEmailVerify(userSnkrs)
            return res.status(200).json({ message: "Email Verification Sent!" });
        }
        else {
            return res.status(400).json({ error: "User not found" });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
module.exports = authVerifyEmail 