const prisma = require("./prisma")
const utils = require("../index")

const addUrl = async (originalUrl) => {

    try {
        const entry = await prisma.url.create({
            data: {
                originalUrl,
                shortCode: utils.generateShortCode(originalUrl)
            }
        })

        return { data: entry, condition: true }
    } catch (error) {
        console.error("Error creating db entry for URL", error)
        return { data: null, condition: false }
    }

}

module.exports = {
    addUrl
}