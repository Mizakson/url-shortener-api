const shortenQueries = require("./shorten")
const urlQueries = require("./url")

module.exports = {
    ...shortenQueries,
    ...urlQueries,
}