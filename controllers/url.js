const utils = require("../utils")
const queries = require("../utils/queries")

async function urlGetReq(req, res) {
    const { shortCode } = req.params

    try {
        const urlData = await queries.getUrlByShortCode(shortCode)

        if (urlData) {
            await queries.incrementUrlTimesClicked(urlData.shortCode)

            return res.redirect(302, urlData.originalUrl)
        } else {
            return res.status(404).json({ error: "Shortcode not found" })
        }

    } catch (error) {
        console.error("Error handling short code get request", error)
        return res.status(500).json({
            error: "Internal server error"
        })
    }

}

module.exports = { urlGetReq }