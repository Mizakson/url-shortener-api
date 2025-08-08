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

    let attempt = 0
    let maxAttempts = 5
    let entry = null

    while (attempt < maxAttempts) {
        try {
            const result = await queries.addUrl(longUrl)

            if (result && result.shortCode) {
                entry = result.data
                return res.status(201).json({
                    message: "Resource created successfully",
                    entry: result.data
                })
            } else if (result && result.alreadyExists) {
                console.log(`Attempt ${attempt + 1}: shortCode collision detected, retrying...`)
            } else {
                console.error("Error during URL creation", result ? result.error : "An unknown error has occured")
                return res.status(500).json({ error: "Failed to shorten URL" })
            }
        } catch (error) {
            console.error("URL shortening error", error)
            return res.status(500).json({
                error: "Failed to shorten URL"
            })
        }
        attempt++
    }
    return res.status(500).json({ error: "Failed to generate a unique short URL after multiple attempts." })
}

module.exports = { shortenPostReq }