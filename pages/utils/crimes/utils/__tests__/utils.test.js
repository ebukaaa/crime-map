import { shallow } from "enzyme";
import { useStore, useProps, getCrimes } from "..";

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

  afterEach(() => shallow(<Store />));

  test("calls Store", () => {
    useEffect = jest.spyOn(React, "useEffect");
    unmount = jest.spyOn(React, "useEffect");

    mockUnmount();
    mockEffect();

    wrapper = shallow(<Store />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  describe("put", () => {
    describe("error", () => {
      test("sets", () => {
        const { putError } = useProps();
        const result = putError({ error: "error" });
        const { initError } = useProps();
        expect(initError).toEqual("error");
        expect(result).toBeUndefined();

        const result2 = putError({ error: "error" });
        expect(result2).toBeNull();
      });
    });
    describe("crimes", () => {
      test("sets", () => {
        const { putCrimes } = useProps();
        const crimes = [{ category: "test" }];
        const result = putCrimes({ crimes });
        const { initCrimes } = useProps();
        expect(initCrimes).toEqual(crimes);
        expect(result).toBeUndefined();

        const result2 = putCrimes({ crimes });
        expect(result2).toBeNull();
      });
    });
  });
  describe("get", () => {
    describe("crimes", () => {
      const crimes = [{ category: "test" }, { category: "test2" }];

      test("returns crimes if initFiltered = null", () => {
        const result = getCrimes({ crimes });

        expect(result).toEqual(crimes);
      });
      test("returns filteredCrimes if initFiltered != null", () => {
        const { putFilter } = useProps();
        putFilter(crimes[0].category);
        const result = getCrimes({ crimes });

        expect(result).toEqual([crimes[0]]);
      });
    });
  });
});
