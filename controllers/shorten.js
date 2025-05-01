const utils = require("../utils/index")

function shortenPostReq(req, res) {
    const { longUrl } = req.body
    const shortCode = utils.generateShortCode(longUrl)

    res.status(201).json({
        originalUrl: longUrl,
        shortCode
    })
}

module.exports = { shortenPostReq }