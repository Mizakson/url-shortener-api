require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const apiRouter = require("./routes/index")

app.use("/api", apiRouter)

app.listen(3000, () => {
    console.log(`listening on http://localhost:3000`)
})