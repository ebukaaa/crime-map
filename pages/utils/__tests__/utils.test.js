import { shallow } from "enzyme";
import { useStore, fetcher, useProps } from "..";

describe("utils", () => {
  let wrapper;

  const Store = useStore;

  afterEach(() => shallow(<Store />));

  test("calls useStore", () => {
    wrapper = shallow(<Store />);
    expect(wrapper.isEmptyRender).toBeTruthy();
  });

  describe("fetcher", () => {
    const json = jest.fn();

    global.fetch = jest.fn();

    test("calls fetch", async () => {
      jest.spyOn(global, "fetch").mockResolvedValueOnce({ json });

      await fetcher();

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(json).toHaveBeenCalledTimes(1);
    });
  });
  describe("useProps", () => {
    test("returns url", () => {
      const { url } = useProps();
      expect(typeof url).toEqual("string");
    });
  });
});
