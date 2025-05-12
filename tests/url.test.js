const request = require("supertest")
const app = require("../app")
const prisma = require("../utils/queries/prisma")

let server

const wikipediaSearchUrl = `https://www.google.com/search?q=wikipedia&oq=wiki&gs_lcrp=EgZjaHJvbWUqCggAEAAYsQMYgAQyCggAEAAYsQMYgAQyDwgBEEUYORiDARixAxiABDIQCAIQLhjHARixAxjRAxiABDIGCAMQBRhAMgYIBBBFGEEyBggFEEUYQTIGCAYQRRhBMgYIBxBFGDzSAQgxMzA5ajBqN6gCCLACAfEFqHrKKM-kGh8&sourceid=chrome&ie=UTF-8
`

const wikipediaSearchShortCode = "bAyjhsWZ"

describe("GET /:shortCode", () => {
    beforeAll(async () => {
        server = app.listen()
        await prisma.$connect()
    })

    // beforeEach(async () => {

    // })

    afterEach(async () => {
        await prisma.url.deleteMany()
    })

    afterAll(async () => {
        await prisma.$disconnect()
        await server.close()
    })

    it("should redirect to the original URL and increment timesClicked", async () => {
        const data = await prisma.url.create({
            data: {
                originalUrl: wikipediaSearchUrl,
                shortCode: wikipediaSearchShortCode
            }
        })

        console.log(data)

        const response = await request(server)
            .get(`/api/${data.shortCode}`)
            .expect(302)
    })
})