const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = prisma

// async function connectAndLog() {
//     try {
//         await prisma.$connect()
//     } catch (error) {
//         console.error("Error connecting to prisma: ", error)
//     } finally {
//         await prisma.$disconnect()
//     }
// }

// connectAndLog()