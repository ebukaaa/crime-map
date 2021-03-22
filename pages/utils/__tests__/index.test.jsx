import { shallow } from "enzyme";
import { useHome } from "../../index.page";

describe("useHome", () => {
  it("render", () => {
    function Home() {
      return useHome();
    }
    const wrapper = shallow(<Home />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
