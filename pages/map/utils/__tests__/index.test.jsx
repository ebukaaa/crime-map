import { shallow } from "enzyme";
import { useProps } from "..";
import { useMap } from "../../index.page";

describe("useMap", () => {
  describe("renders", () => {
    const Map = useMap;

    it("alert if !isOnline", () => {
      expect(
        shallow(<Map />)
          .find("#alert")
          .isEmptyRender()
      ).toBeFalsy();
    });
    it("not alert if isOnline", () => {
      const wrapper = shallow(<Map />);
      const { putOnline } = useProps();
      putOnline(true);
      expect(wrapper.find("#alert").isEmptyRender()).toBeTruthy();
    });
  });
});
