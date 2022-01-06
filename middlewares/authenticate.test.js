const { authenticate } = require(".");

describe("Middlewares", () => {
    test("should have ID 1", () => {
        const req = {
            header: jest.fn().mockReturnValue("1"),
        };
        const res = {
            sendStatus: jest.fn(),
        };
        const next = jest.fn();
        authenticate(req, res, next);
        expect(req.header.mock.calls).toEqual([["user_id"]]);
        expect(res.sendStatus.mock.calls).toEqual([[201]]);
        expect(next.mock.calls).toEqual([[]]);
    });
    test("should fail without ID 1", () => {
        const req = {
            header: jest.fn().mockReturnValue("2"),
        };
        const res = { sendStatus: jest.fn() };
        const next = jest.fn();

        authenticate(req, res, next);
        expect(req.header.mock.calls).toEqual([["user_id"]]);
        expect(res.sendStatus.mock.calls).toEqual([[403]]);
        expect(next.mock.calls).toEqual([]);
    });
});
