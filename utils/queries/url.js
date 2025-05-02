const prisma = require("./prisma")

const getUrlByShortCode = async (shortCode) => {
    const entry = await prisma.urls.findUnique({
        where: {
            shortCode: shortCode
        }
    })

    return entry
}

const incrementUrlTimesClicked = async (shortCode) => {
    const entry = await prisma.urls.update({
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