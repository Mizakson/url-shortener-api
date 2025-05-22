const prisma = require("./prisma")
const utils = require("../index")
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime/library")

const addUrl = async (originalUrl) => {

    try {
        const entry = await prisma.url.create({
            data: {
                originalUrl,
                shortCode: utils.generateShortCode(originalUrl)
            }
        })

        return { data: entry, success: true, alreadyExists: false }
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            // prisma unique constraint error :: if shortCode matches an existing code
            if (error.code === "P2002") {
                console.log("An entry with this shortCode already exists", error)
                return { data: null, success: false, alreadyExists: true }
            }
            console.error("Prisma Client Known Request Error", error)
            return { data: null, success: false, alreadyExists: false, error: "Database error" }
        } else {
            console.error("An unexpected error has occured", error)
            return { data: null, success: false, alreadyExists: false, error: "Internal server error" }
        }

    }

}

module.exports = {
    addUrl
}