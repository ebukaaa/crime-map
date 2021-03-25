import { shallow } from "enzyme";
// import preloadAll from "jest-next-dynamic";
import { useContainer, useProps, useStore } from "..";

// beforeAll(async () => Promise.resolve(preloadAll));

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
      global.navigator = {
        onLine: false,
      };

      mockUnmount();
      mockEffect();

      mockEffect();

      wrapper = shallow(<Store />);
      expect(wrapper.isEmptyRender()).toBeFalsy();
    });
    test("isOnline = false", () => {
      const { initOnline } = useProps();
      expect(initOnline).toBeFalsy();
    });
  });
  describe("dynamic", () => {
    describe("useContainer", () => {
      it("renders", () => {
        const Container = useContainer;
        wrapper = shallow(<Container />);
        expect(wrapper.isEmptyRender()).toBeFalsy();
      });
    });
  });
});
