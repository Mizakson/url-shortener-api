const prisma = require("./prisma")

const getUrlByShortCode = async (shortCode) => {
    const entry = await prisma.url.findUnique({
        where: {
            shortCode: shortCode
        }
    })

    return entry
}

const incrementUrlTimesClicked = async (shortCode) => {
    const entry = await prisma.url.update({
        where: {
            shortCode: shortCode
        },
        data: {
            timesClicked: {
                increment: 1
            }
        }
    })

    return entry
}

module.exports = {
    getUrlByShortCode,
    incrementUrlTimesClicked
}