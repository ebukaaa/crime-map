import { shallow } from "enzyme";
import { useProps, useStore } from "..";
import { useStore as AppStore, useProps as appProps } from "../../..";
import { useStore as ResetButtonStore } from "../../../reset-button/utils";

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

  describe("useStore", () => {
    test("initialises", () => {
      shallow(<ResetButtonStore />);
      useEffect = jest.spyOn(React, "useEffect");
      unmount = jest.spyOn(React, "useEffect");

      mockUnmount();
      mockEffect();

      mockEffect();

      wrapper = shallow(<Store />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });

    describe("crimes useMemo", () => {
      const filtered = "category2";
      const crimes = [{ category: "category1" }, { category: filtered }];

      test("returns filtered crimes if filtered != null", () => {
        shallow(<AppStore />);
        const { putCrimes } = appProps();
        putCrimes(crimes);
        const { putFilter } = useProps();
        putFilter(filtered);
        const { initFiltered } = useProps();
        expect(initFiltered).toEqual(filtered);
      });
    });
  });
  describe("dynamic", () => {
    describe("useCrimes", () => {
      test("renders", () => {
        const { useCrimes: Crimes } = useProps();
        expect(shallow(<Crimes />).isEmptyRender()).toBeFalsy();
      });
    });
  });
});
