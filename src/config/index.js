const db = require('./dbConfig')
const config = require('./config')
const firebase = require('./firebaseConfig')
const mailTransport = require('./mailTransportConfig')
const swaggerSpec = require('./swaggerSpecConfig')

module.exports = {
    db,
    config,
    firebase,
    mailTransport,
    swaggerSpec
}