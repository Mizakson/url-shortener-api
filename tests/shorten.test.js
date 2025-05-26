const request = require("supertest")
const app = require("../app")
const prisma = require("../utils/queries/prisma")
const queries = require("../utils/queries")
const utils = require("../utils")

let server
const wikipediaSearchUrl = `https://www.google.com/search?q=wikipedia&oq=wiki&gs_lcrp=EgZjaHJvbWUqCggAEAAYsQMYgAQyCggAEAAYsQMYgAQyDwgBEEUYORiDARixAxiABDIQCAIQLhjHARixAxjRAxiABDIGCAMQBRhAMgYIBBBFGEEyBggFEEUYQTIGCAYQRRhBMgYIBxBFGDzSAQgxMzA5ajBqN6gCCLACAfEFqHrKKM-kGh8&sourceid=chrome&ie=UTF-8`

jest.mock("../utils/queries");

describe("POST /shorten", () => {
    beforeAll(async () => {
        server = app.listen()
        await prisma.$connect()
    })

    beforeEach(async () => {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    })

    afterEach(async () => {
        await prisma.url.deleteMany()
    })

    afterAll(async () => {
        await prisma.$disconnect()
        await server.close()
    })

    it('recieves data and creates a new resource', async () => {
        const data = await queries.addUrl(wikipediaSearchUrl)
        const response = request(server)
            .post("/api/shorten")
            .send(data)
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(201)

    })

    it('should return 400 status if no url entered', async () => {
        const data = queries.addUrl("")

        const response = request(server)
            .post("/api/shorten")
            .send(data)
            .expect(400, {
                error: "Please provide a url"
            })
    })

    it('should return 400 status if invalid url entered', async () => {
        const data = queries.addUrl("wikipediaSearchUr")

        const response = request(server)
            .post("/api/shorten")
            .send(data)
            .expect(400, {
                error: "Please provide a valid url"
            })

    })

    it('should create a URL successfully after one shortCode collision', async () => {
        const testUrl = "https://www.test.com/url/example"
        const initialCode = "AAAAAAAA" // 8 char length
        const finalCode = "BBBBBBBB"

        const mockEntry = { orignalUrl: testUrl, shortCode: finalCode }

        // mock generateShortCode util method
        const mockGenerateShortCode = jest.spyOn(utils, "generateShortCode")
        mockGenerateShortCode.mockReturnValueOnce(initialCode).mockReturnValueOnce(finalCode)

        queries.addUrl
            .mockResolvedValueOnce({ data: null, success: false, alreadyExists: true }) // collision
            .mockResolvedValueOnce({ data: mockEntry, success: true, alreadyExists: false }) // success

        const response = await request(server)
            .post("/api/shorten")
            .send({ longUrl: testUrl })
        // .expect(201)

        expect(response.statusCode).toBe(201)
        expect(response.body.entry).toEqual(mockEntry)

    })

    it('should create a URL successfully after multiple shortCode collisions', async () => {
        const testUrl = "https://www.longer-example/user/profile/settings"

        const shortCodes = ["AAAAAAAA", "BBBBBBBB", "CCCCCCCC", "DDDDDDDD"]
        const finalCode = "DDDDDDDD"

        const mockEntry = { orignalUrl: testUrl, shortCode: finalCode }

        const mockGenerateShortCode = jest.spyOn(utils, "generateShortCode")
        mockGenerateShortCode.mockReturnValueOnce(shortCodes[0])
            .mockReturnValueOnce(shortCodes[1])
            .mockReturnValueOnce(shortCodes[2])
            .mockReturnValueOnce(shortCodes[3])

        queries.addUrl
            .mockResolvedValueOnce({ data: null, success: false, alreadyExists: true }) // collision
            .mockResolvedValueOnce({ data: null, success: false, alreadyExists: true }) // collision
            .mockResolvedValueOnce({ data: mockEntry, success: true, alreadyExists: false }) // success

        const response = await request(server)
            .post("/api/shorten")
            .send({ longUrl: testUrl })

        expect(response.statusCode).toBe(201)
        expect(response.body.entry).toEqual(mockEntry)

    })

    it('should return an error after max attempts at URL creation fails', async () => {
        const testUrl = "https://www.maxcollision.com/wont/change"
        const shortCode = "HHHHHHHH"

        const mockGenerateShortCode = jest.spyOn(utils, 'generateShortCode')
        mockGenerateShortCode.mockReturnValueOnce(shortCode)

        queries.addUrl.mockResolvedValueOnce({ data: null, success: false, alreadyExists: true })

        const response = await request(server)
            .post("/api/shorten")
            .send({ longUrl: testUrl })

        expect(response.statusCode).toBe(500)
        expect(response.body.error).toContain("Failed to shorten URL")

    })

})

