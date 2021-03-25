import { shallow } from "enzyme";
import { useContainer } from "../..";

describe("useContainer", () => {
  it("renders", () => {
    const Container = useContainer;
    const wrapper = shallow(<Container />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
