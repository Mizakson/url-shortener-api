const { Router } = require("express")

const api = Router()

const shortenRouter = require("./shorten")
const urlRouter = require("./url")

api.use("/:shortCode", urlRouter)
api.use("/shorten", shortenRouter)

module.exports = api