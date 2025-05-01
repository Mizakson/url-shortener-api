require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const apiRouter = require("./routes/index")

app.use("/api", apiRouter)

app.listen(3000, () => {
    // console.log(`listening on ${process.env.BASE_URL}`)
    // comment out console statement when running tests
})

module.exports = app