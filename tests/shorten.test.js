const request = require("supertest")
const app = require("../app")
const prisma = require("../utils/queries/prisma")
const queries = require("../utils/queries")

let server
const wikipediaSearchUrl = `https://www.google.com/search?q=wikipedia&oq=wiki&gs_lcrp=EgZjaHJvbWUqCggAEAAYsQMYgAQyCggAEAAYsQMYgAQyDwgBEEUYORiDARixAxiABDIQCAIQLhjHARixAxjRAxiABDIGCAMQBRhAMgYIBBBFGEEyBggFEEUYQTIGCAYQRRhBMgYIBxBFGDzSAQgxMzA5ajBqN6gCCLACAfEFqHrKKM-kGh8&sourceid=chrome&ie=UTF-8`
const wikipediaSearchShortCode = "bAyjhsWZ"

describe("POST /shorten", () => {
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

    it('recieves data and creates a new resource', async () => {
        const data = await queries.addUrl(wikipediaSearchUrl, wikipediaSearchShortCode)
        const response = request(server)
            .post("/api/shorten")
            .send(data)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(201)

    })

    it('should return 400 status if no url entered', async () => {
        const data = queries.addUrl("", wikipediaSearchShortCode)

        const response = request(server)
            .post("/api/shorten")
            .send(data)
            .expect(400, {
                error: "Please provide a url"
            })
    })

    it('should return 400 status if invalid url entered', async () => {
        const data = queries.addUrl(wikipediaSearchUrl, "")

        const response = request(server)
            .post("/api/shorten")
            .send(data)
            .expect(400, {
                error: "Please provide a valid url"
            })

    })

})

