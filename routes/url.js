const { Router } = require("express")
const controller = require("../controllers")

const urlRouter = Router()

urlRouter.get("/", controller.urlGetReq)

module.exports = urlRouter