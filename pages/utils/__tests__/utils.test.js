import { shallow } from "enzyme";
import { useStore, useAppStore, useProps, checkData, checkError } from "..";
import {
  useStore as CrimesStore,
  useProps as crimesProps,
} from "../crimes/utils";

describe("utils", () => {
  let useEffect;
  let unmount;
  let callback;
  let wrapper;

  function mockEffect() {
    return useEffect.mockImplementationOnce((f) => f());
  }
  function mockUnmount() {
    return unmount.mockImplementationOnce((f) => {
      callback = f();
      callback();
    });
  }

  const Store = useStore;
  const crimes = [{ category: "category" }];

  afterEach(() => shallow(<Store />));

  test("calls useStore", () => {
    useEffect = jest.spyOn(React, "useEffect");
    unmount = jest.spyOn(React, "useEffect");

    mockUnmount();
    mockEffect();
    mockUnmount();
    mockEffect();

    mockEffect();
    mockEffect();

    wrapper = shallow(<Store />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  describe("fetcher", () => {
    const json = jest.fn();
    global.fetch = jest.fn();

    test("calls fetch", async () => {
      const { fetcher } = useAppStore();
      jest.spyOn(global, "fetch").mockResolvedValueOnce({ json });

      await fetcher();

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(json).toHaveBeenCalledTimes(1);
    });
  });
  describe("filter", () => {
    const value = "value-test";

    test("filters crimes with value", () => {
      const { filter, putCrimes } = useProps();
      putCrimes(crimes);
      shallow(<CrimesStore />);
      filter(value);
      const { initFiltered } = crimesProps();
      expect(initFiltered).toEqual(value);
    });
  });
  describe("check", () => {
    describe("data", () => {
      test("sets crimes if empty || SWRData exist", () => {
        checkData({ SWRData: crimes });
        const { initCrimes } = useProps();
        expect(initCrimes).toEqual(crimes);
      });
    });
    describe("error", () => {
      test("sets error if SWRError exists", () => {
        checkError({ SWRError: "Error" });
        const { initError } = useProps();
        expect(initError).toEqual("Error");
      });
    });
  });
});
