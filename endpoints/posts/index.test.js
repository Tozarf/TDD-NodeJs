// {
//     "userId": 1,
//     "id": 1,
//     "title": "title",
//     "body": "body post"
//   }
const postHandlers = require("./index");
describe("Endpoints", () => {
    test("should post correctly", async () => {
        const mockUsers = [
            {
                id: 1,
            },
            {
                id: 2,
            },
        ];

        const post = {
            userId: 1,
            title: "title",
            body: "body post",
        };
        const req = {
            body: post,
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const axios = {
            get: jest.fn().mockResolvedValue({ data: mockUsers }),
            post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
        };

        await postHandlers({ axios }).post(req, res);
        expect(res.status.mock.calls).toEqual([[201]]);
        expect(res.send.mock.calls).toEqual([[{ id: 1000 }]]);
        expect(axios.get.mock.calls).toEqual([
            ["https://jsonplaceholder.typicode.com/users"],
        ]);
        expect(axios.post.mock.calls).toEqual([
            ["https://jsonplaceholder.typicode.com/posts", post],
        ]);
    });
    test("should not create if user id does not exist", async () => {
        const mockUsers = [
            {
                id: 1,
            },
            {
                id: 2,
            },
        ];

        const post = {
            userId: 3,
            title: "title",
            body: "body post",
        };
        const req = {
            body: post,
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            sendStatus: jest.fn(),
        };
        const axios = {
            get: jest.fn().mockResolvedValue({ data: mockUsers }),
            post: jest.fn().mockResolvedValue({ data: { id: 1000 } }),
        };
        await postHandlers({ axios }).post(req, res);
        expect(axios.post.mock.calls).toEqual([]);
        expect(res.sendStatus.mock.calls).toEqual([[400]]);
    });
});