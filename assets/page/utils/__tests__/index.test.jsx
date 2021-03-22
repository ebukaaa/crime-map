import { shallow } from "enzyme";
import {} from "../../index.page";

describe("use", () => {
  it("renders", () => {
    const wrapper = shallow();
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
