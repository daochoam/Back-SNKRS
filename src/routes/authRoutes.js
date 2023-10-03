const { Router } = require('express');
const authRoutes = Router();

const { deleteSessionsByEmail } = require('../middlewares')
const {
    authActiveAccount,
    authSignIn,
    authSignOut,
    authSignUp,
    authUpdateSession,
    authVerifyEmail,
    authVerifySession,
} = require('../controllers/auth')



authRoutes.post("/sign-in", deleteSessionsByEmail, authSignIn)
authRoutes.post("/sign-out", authSignOut)
authRoutes.post("/sign-up", authSignUp)
authRoutes.get("/session", authVerifySession)
authRoutes.put("/session", authUpdateSession)
authRoutes.post("/verify-email/:email", authVerifyEmail)
authRoutes.get("/:userActive", authActiveAccount);

module.exports = authRoutes