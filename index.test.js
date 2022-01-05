describe("Test", () => {
    test("should sum 2 numbers", () => {
        const sum = (a, b) => {
            return a + b;
        };
        expect(sum(1, 2)).toEqual(3);
    });
});
