const crytpo = require("node:crypto")

// generate shortCode with a default length of 8
function generateShortCode(url, length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let shortCode = ''
    for (let i = 0; i < length; i++) {
        shortCode += characters.charAt(Math.floor(Math.random() * characters.length))
    }
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