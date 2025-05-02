const shortenController = require("./shorten")
const urlController = require("./url")

module.exports = {
    ...shortenController,
    ...urlController,
}