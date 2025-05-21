const utils = require("../utils")
const queries = require("../utils/queries")
const prisma = require("../utils/queries/prisma")

async function shortenPostReq(req, res) {
    const { longUrl } = req.body

    if (!longUrl) return res.status(400).json({
        error: "Please provide a url"
    })

    if (!utils.isValidHttpUrl(longUrl)) return res.status(400).json({
        error: "Please provide a valid url"
    })

    try {
        const entry = await queries.addUrl(longUrl)

        return res.status(201).json({
            entry
        })
    } catch (error) {
        console.error("URL shortening error", error)
        return res.status(500).json({
            error: "Failed to shorten URL"
        })
    }


}

module.exports = { shortenPostReq }