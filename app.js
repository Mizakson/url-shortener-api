// require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
    res.json({ message: "Hello from app.js..." })
})

app.listen(3000, () => {
    console.log(`listening on http://localhost:3000`)
})