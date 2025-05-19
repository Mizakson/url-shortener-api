require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { rateLimit } = require("express-rate-limit")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1hr
    limit: 240, // 4 requests per min 
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: "request limit reached",
})

app.use(limiter)

const apiRouter = require("./routes/index")

app.use("/api", apiRouter)

app.listen(3000, () => {
    console.log(`listening on ${process.env.BASE_URL}`)
    // comment out console statement when running tests
})

module.exports = app