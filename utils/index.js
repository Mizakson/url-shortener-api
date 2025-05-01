const crytpo = require("node:crypto")

// generate shortCode with a default length of 8
// using 'sha256' hashing algorithm
function generateShortCode(url, length = 8) {
    const hash = crytpo.createHash('sha256').update(url).digest('base64url')
    const shortCode = hash.substring(0, length)

    return shortCode
}

function isValidHttpUrl(string) {
    try {
        return Boolean(new URL(string))
    } catch (error) {
        return false
    }
}

module.exports = { generateShortCode, isValidHttpUrl }