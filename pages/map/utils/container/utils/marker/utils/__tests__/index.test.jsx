import { shallow } from "enzyme";
import {} from "../..";

describe("use", () => {
  it("renders", () => {
    const wrapper = shallow();
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
