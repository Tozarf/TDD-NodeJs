const handlers = require("../../users");

describe("Endpoints", () => {
    test("GET method should work correctly ", async () => {
        const axios = { get: jest.fn().mockResolvedValue({ data: 1 }) };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await handlers({ axios }).get({}, res);

        expect(res.status.mock.calls).toEqual([[200]]);
        expect(res.send.mock.calls).toEqual([[1]]);
    });
    test("POST method should work correctly", async () => {
        const axios = { post: jest.fn().mockResolvedValue({ data: 1 }) };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const req = {
            body: "request body",
        };

        await handlers({ axios }).post(req, res);
        expect(res.status.mock.calls).toEqual([[201]]);
        expect(res.send.mock.calls).toEqual([[1]]);
        expect(axios.post.mock.calls).toEqual([
            ["https://jsonplaceholder.typicode.com/users", "request body"],
        ]);
    });
    test("PUT method should work correctly", async () => {
        const axios = { put: jest.fn() };
        const req = {
            body: "request body",
            params: { id: 2 },
        };
        const res = {
            sendStatus: jest.fn(),
        };

        await handlers({ axios }).put(req, res);
        expect(axios.put.mock.calls).toEqual([
            [`https://jsonplaceholder.typicode.com/users/2`, "request body"],
        ]);
        expect(res.sendStatus.mock.calls).toEqual([[204]]);
    });
    test("DELETE method should work correctly", async () => {
        const axios = { delete: jest.fn() };
        const req = {
            params: { id: 9 },
        };
        const res = {
            sendStatus: jest.fn(),
        };

        await handlers({ axios }).delete(req, res);
        expect(axios.delete.mock.calls).toEqual([
            [`https://jsonplaceholder.typicode.com/users/9`],
        ]);
        expect(res.sendStatus.mock.calls).toEqual([[204]]);
    });
});
