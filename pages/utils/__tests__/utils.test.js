import { shallow } from "enzyme";
import { useStore } from "..";

describe("utils", () => {
  let wrapper;

  const Store = useStore;

  afterEach(() => shallow(<Store />));
  test("calls useStore", () => {
    wrapper = shallow(<Store />);
    expect(wrapper.isEmptyRender).toBeTruthy();
  });
});
