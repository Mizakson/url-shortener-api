const prisma = require("./prisma")

const addUrl = async (originalUrl, shortCode) => {
    const entry = await prisma.urls.create({
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