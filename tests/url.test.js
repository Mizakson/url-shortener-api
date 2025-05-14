const request = require("supertest")
const app = require("../app")
const prisma = require("../utils/queries/prisma")
const queries = require("../utils/queries")
const utils = require("../utils")

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
        const response = await request(server)
            .get(`/api/${data.shortCode}`)
            .expect(302)

        // the original header has %0A at the start and end of url
        const locationHeader = response.headers.location
        // console.log(locationHeader)
        const cleanedLocationHeader = locationHeader.replace(/%0A/g, "")
        console.log(cleanedLocationHeader)
        // trim to get actual strings to compare
        expect(cleanedLocationHeader.trim()).toBe(data.originalUrl.trim())

        // test to confirm increment counter works
        const updatedCounter = await queries.incrementUrlTimesClicked(data.shortCode)
        expect(updatedCounter.timesClicked).toBe(1)
    })
})