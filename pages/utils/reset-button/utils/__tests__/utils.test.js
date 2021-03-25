import { shallow } from "enzyme";
import { useProps, useStore } from "..";

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
      useEffect = jest.spyOn(React, "useEffect");
      unmount = jest.spyOn(React, "useEffect");

      mockUnmount();
      mockEffect();

      wrapper = shallow(<Store />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
    test("initFiltered == null", () => {
      const { initFiltered } = useProps();
      expect(initFiltered).toBeNull();
    });
  });
});
