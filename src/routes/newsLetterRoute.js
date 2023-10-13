const { Router } = require("express")
const controllers = require("../controllers/newsLetter/index")

const newsletterRouter = Router()

newsletterRouter.post("/", controllers.newsletter)

module.exports = newsletterRouter