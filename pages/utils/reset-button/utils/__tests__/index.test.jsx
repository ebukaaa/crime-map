import { shallow } from "enzyme";
import { useProps } from "..";
import { useResetButton } from "../..";

describe("useResetButton", () => {
  describe("renders", () => {
    const Reset = useResetButton;

    it("nothing if !filtered", () => {
      expect(
        shallow(<Reset />)
          .find("button")
          .isEmptyRender()
      ).toBeTruthy();
    });
    it("button if filtered", () => {
      const wrapper = shallow(<Reset />);
      const { putFilter } = useProps();
      putFilter(true);
      expect(wrapper.find("button").isEmptyRender()).toBeFalsy();
    });
  });
});
