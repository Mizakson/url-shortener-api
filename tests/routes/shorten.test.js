require("dotenv").config()
const request = require("supertest")
const express = require("express")
const app = express()

const baseUrl = process.env.BASE_URL
const wikipediaSearchUrl = `
https://www.google.com/search?q=wikipedia&oq=wiki&gs_lcrp=
EgZjaHJvbWUqCggAEAAYsQMYgAQyCggAEAAYsQMYgAQyDwgBEEUYORiDAR
ixAxiABDIQCAIQLhjHARixAxjRAxiABDIGCAMQBRhAMgYIBBBFGEEyBggF
EEUYQTIGCAYQRRhBMgYIBxBFGDzSAQgxMzA5ajBqN6gCCLACAfEFqHrKKM
-kGh8&sourceid=chrome&ie=UTF-8
`
const wikipediaUrlShortCode = "bAyjhsWZ"

describe("POST /shorten", () => {
    it('works', (done) => {
        request(app)
            .post("/api/shorten")
            .send(`longUrl=${wikipediaSearchUrl}`)
            .expect((res) => {
                res.body.longUrl = wikipediaSearchUrl
                res.shortCode = wikipediaUrlShortCode
            })
            .expect(200, {
                longUrl: wikipediaSearchUrl,
                shortCode: wikipediaUrlShortCode
            })
            .end((err, res) => {
                if (err) return done(err)
                return done()
            })
    })
})