const jwt = require('jsonwebtoken');
const { config: { SESSION_TIME, JWT_ID_SESSION } } = require('../../config')

const handlerTokenIdSession = (sessionID) => {
    try {
        const tokenID = jwt.sign({ sessionID },
            JWT_ID_SESSION,
            { expiresIn: `${SESSION_TIME}m` }); // '30m' para 30 minutos
        return tokenID
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = handlerTokenIdSession;
