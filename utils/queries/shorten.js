const prisma = require("./prisma")

const addUrl = async (originalUrl, shortCode) => {
    const entry = await prisma.url.create({
        data: {
            originalUrl,
            shortCode
        }
    })

    return entry
}

module.exports = {
    addUrl
}