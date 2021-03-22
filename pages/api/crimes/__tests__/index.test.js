import { useApi } from "../get.page";

describe("useApi", () => {
  const response = {
    statusCode: null,
    json: jest.fn(),
  };

  describe("response", () => {
    const json = jest.fn();
    global.fetch = jest.fn();

    test("calls json", async () => {
      jest.spyOn(global, "fetch").mockResolvedValueOnce({ json });

      await useApi(null, response);

      expect(response.json).toHaveBeenCalledTimes(1);
      expect(typeof response.statusCode).toEqual("number");
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(json).toHaveBeenCalledTimes(1);
    });
  });
});
