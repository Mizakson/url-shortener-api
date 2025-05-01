require("dotenv").config()
const request = require("supertest")
const app = require("../../app")

const wikipediaSearchUrl = `
https://www.google.com/search?q=wikipedia&oq=wiki&gs_lcrp=
EgZjaHJvbWUqCggAEAAYsQMYgAQyCggAEAAYsQMYgAQyDwgBEEUYORiDAR
ixAxiABDIQCAIQLhjHARixAxjRAxiABDIGCAMQBRhAMgYIBBBFGEEyBggF
EEUYQTIGCAYQRRhBMgYIBxBFGDzSAQgxMzA5ajBqN6gCCLACAfEFqHrKKM
-kGh8&sourceid=chrome&ie=UTF-8
`

describe("POST /shorten", () => {
    let server
    beforeAll(async () => {
        server = app.listen()
    })

    it('recieves data and creates a new resource', (done) => {
        const response = request(server)
            .post("/api/shorten")
            .send({ longUrl: wikipediaSearchUrl })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)
                return done()
            })
    })

    it('should return 400 status if no url entered', (done) => {
        const response = request(server)
            .post("/api/shorten")
            .send({})
            .expect(400, {
                error: "Please provide a url"
            })
            .end((err, res) => {
                if (err) return done(err)
                return done()
            })
    })

    it('should return 400 status if invalid url entered', (done) => {
        const response = request(server)
            .post("/api/shorten")
            .send({ longUrl: "This is not a url" })
            .expect(400, {
                error: "Please provide a valid url"
            })
            .end((err, res) => {
                if (err) return done(err)
                return done()
            })
    })


    afterAll(async () => {
        await server.close()
    })
})

