const express = require("express");
const session = require('express-session');
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const { config, swaggerSpec } = require('./config')
const swaggerUI = require('swagger-ui-express');
const snkrsRoutes = require('./routes')
const MongoStore = require('connect-mongo')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use(cookieParser());
// Config la session
const sessionConfig = {
    name: config.SESSION_NAME,
    secret: config.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        path: '/',
        secure: false,
        httpOnly: true,
        maxAge: config.SESSION_TIME * 60 * 1000,
    },
    store: new MongoStore({
        mongoUrl: config.URL_MONGO_SNKRS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        collection: 'sessions',
        ttl: config.SESSION_TIME * 60,
        stringify: false
    })
}

app.use(session(sessionConfig));

// Middlewares de registro y CORS
app.use(morgan("dev"))

// Middleware de rutas
app.use(snkrsRoutes);


// Ruta para la documentación Swagger UI
app.use('/snkrs/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = app;