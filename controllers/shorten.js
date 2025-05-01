const utils = require("../utils/index")

function shortenPostReq(req, res) {
    const { longUrl } = req.body

    if (!longUrl) return res.status(400).json({
        error: "Please provide a url"
    })

    if (!utils.isValidHttpUrl(longUrl)) return res.status(400).json({
        error: "Please provide a valid url"
    })

    try {
        const shortCode = utils.generateShortCode(longUrl)

        // add to db here

        return res.status(201).json({
            originalUrl: longUrl,
            shortCode
        })
    } catch (error) {
        console.error("URL shortening error", error)
        return res.status(500).json({
            error: "Failed to shorten URL"
        })
    }




}

module.exports = { shortenPostReq }