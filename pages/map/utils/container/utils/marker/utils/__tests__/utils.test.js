import { shallow } from "enzyme";
import { useStore } from "..";

describe("utils", () => {
  // let useEffect;
  // let unmount;
  // let callback;
  let wrapper;

  // function mockEffect() {
  //   return useEffect.mockImplementationOnce((f) => f());
  // }
  // function mockUnmount() {
  //   return unmount.mockImplementationOnce((f) => {
  //     callback = f();
  //     callback();
  //   });
  // }

  const Store = useStore;

  afterEach(() => shallow(<Store />));

  test("calls useStore", () => {
    // useEffect = jest.spyOn(React, "useEffect");
    // unmount = jest.spyOn(React, "useEffect");

    // mockUnmount();
    // mockEffect();

    wrapper = shallow(<Store />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
