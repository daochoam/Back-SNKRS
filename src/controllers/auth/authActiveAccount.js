const jwt = require('jsonwebtoken');
const { User } = require("../../schemas");
const { config: { JWT_MAIL } } = require('../../config')


const authActiveAccount = async (req, res) => {
    const { userActive } = req.params

    try {
        const decodedToken = jwt.verify(userActive, JWT_MAIL);
        const { activation, email } = decodedToken
        await User.updateOne({ email }, { $set: { status: "active" } });
        res.status(200).redirect(activation)
    } catch (error) {
        res.status(401).send(error.message);
    }

}

module.exports = authActiveAccount