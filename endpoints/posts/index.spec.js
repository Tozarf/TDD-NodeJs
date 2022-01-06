const request = require("supertest");
const app = require("../../server");

describe("Server Endpoints", () => {
    test("should create a new post", async () => {
        const response = await request(app)
            .post("/")
            .send({ userId: 5 })
            .set("Accept", "application/json")
            .set("user_id", 1)
            .expect(201);
        expect(response.statusCode).toEqual(201);
        expect(response.body.userId).toEqual(5);
        expect(response.body).toHaveProperty("id");
    });
});
