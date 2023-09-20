const jwt = require('jsonwebtoken');
const { config: { JWT_ID_SESSION } } = require('../../config')

const handlerDecodeTokenIDSession = (tokenSessionID) => {
    try {
        const { sessionID } = jwt.verify(tokenSessionID, JWT_ID_SESSION);
        return sessionID
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = handlerDecodeTokenIDSession