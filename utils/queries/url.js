const prisma = require("./prisma")

const getUrlByShortCode = async (shortCode) => {
    const entry = await prisma.url.findFirst({
        where: {
            shortCode
        }
    })

    return entry
}

const incrementUrlTimesClicked = async (shortCode) => {
    if (!shortCode) {
        console.error("Error: shortCode is undefined in incrementUrlTimesClicked")
        return null
    }
    try {
        const entry = await prisma.url.update({
            where: {
                shortCode: shortCode,
            },
            data: {
                timesClicked: {
                    increment: 1
                }
            }
        })
        return entry
    } catch (error) {
        console.error("Error incrementing timesClicked:", error)
        return null
    }
};

module.exports = {
    getUrlByShortCode,
    incrementUrlTimesClicked
}