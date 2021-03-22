import { useApi } from "../hello.page";

describe("useApi", () => {
  const response = {
    statusCode: 0,
    json: jest.fn((name) => name),
  };

  describe("response", () => {
    beforeEach(() => useApi(null, response));

    test("calls json", () => {
      expect(response.json).toHaveBeenCalledTimes(1);
    });
    test("sets statusCode", () => {
      expect(typeof response.statusCode).toEqual("number");
    });
  });
});
