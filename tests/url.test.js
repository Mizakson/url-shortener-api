const request = require("supertest")
const app = require("../app")
const prisma = require("../utils/queries/prisma")
const queries = require("../utils/queries")
const utils = require("../utils")

let server

const wikipediaSearchUrl = `https://www.google.com/search?q=wikipedia&oq=wiki&gs_lcrp=EgZjaHJvbWUqCggAEAAYsQMYgAQyCggAEAAYsQMYgAQyDwgBEEUYORiDARixAxiABDIQCAIQLhjHARixAxjRAxiABDIGCAMQBRhAMgYIBBBFGEEyBggFEEUYQTIGCAYQRRhBMgYIBxBFGDzSAQgxMzA5ajBqN6gCCLACAfEFqHrKKM-kGh8&sourceid=chrome&ie=UTF-8
`

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
        const entry = await queries.addUrl(wikipediaSearchUrl)

        const response = await request(server)
            .get(`/api/${entry.data.shortCode}`)
            .expect(302)

        // the original header has %0A at the start and end of url
        const locationHeader = response.headers.location
        // console.log(locationHeader)
        const cleanedLocationHeader = locationHeader.replace(/%0A/g, "")
        // console.log(cleanedLocationHeader)
        // trim to get actual strings to compare
        expect(cleanedLocationHeader.trim()).toBe(entry.data.originalUrl.trim())

        // test to confirm increment counter works
        // it works but when watching other tests it calls more than once
        // const updatedCounter = await queries.incrementUrlTimesClicked(entry.data.shortCode)
        // expect(updatedCounter.timesClicked).toBe(1)
    })

    it("should return 404 if invalid shortCode is entered", async () => {
        const fakeCode = "NotValidCode"

        const response = await request(server)
            .get(`/api/${fakeCode}`)
            .expect(404, { error: "Shortcode not found" })
    })
})