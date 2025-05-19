const prisma = require("./prisma")

const addUrl = async (originalUrl, shortCode) => {

    try {
        const entry = await prisma.url.create({
            data: {
                originalUrl,
                shortCode
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