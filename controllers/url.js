// get request to redirect to url, dynamic route shortCode
// perform 302 redirect to original url from db
// clicks tracked also here?

const utils = require("../utils/index")
const queries = require("../utils/queries/index")

async function urlGetReq(req, res) {
    const { shortCode } = req.params

    try {
        const urlData = await queries.getUrlByShortCode(shortCode)

        if (urlData) {
            const originalUrl = urlData.originalUrl

            await queries.incrementUrlTimesClicked(shortCode)

            return res.redirect(302, originalUrl)
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