require("dotenv").config();

const config = {}
config.PORT = process.env.PORT || 3000

config.URL_MONGO_SNKRS = `mongodb+srv://snkrs:${process.env.DB_PASSWORD}@${process.env.DB_USER}.b5rmmur.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

config.URL_FRONT = process.env.URL_FRONT_SNKRS
config.URL_BACK = process.env.URL_BACK_SNKRS

config.JWT_MAIL = process.env.JWT_MAIL_KEY
config.MAIL_ROUTE = process.env.MAIL_ROUTE
config.MAIL_SNKRS = process.env.MAIL_EMAIL
config.PASS_SNKRS = process.env.MAIL_PASSWORD

config.JWT_ID_SESSION = process.env.JWT_ID_SESSION
config.SESSION_KEY = process.env.COOKIE_KEY
config.SESSION_NAME = process.env.COOKIE_NAME
config.SESSION_TIME = parseInt(process.env.COOKIE_TIME)

module.exports = config;