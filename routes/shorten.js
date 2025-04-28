const { Router } = require("express")
const controller = require("../controllers/index")

const shortenRouter = Router()

shortenRouter.post("/", controller.shortenPostReq)

module.exports = shortenRouter