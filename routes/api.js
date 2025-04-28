const { Router } = require("express")

const api = Router()

const shortenRouter = require("./shorten")
// const urlRouter = require("./url")

api.use("/shorten", shortenRouter)
// api.use("/:shortCode", urlRouter)

module.exports = api