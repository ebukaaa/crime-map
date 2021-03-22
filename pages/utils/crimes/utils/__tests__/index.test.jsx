import { shallow } from "enzyme";
import { useCrimes } from "../..";
import { useProps } from "..";

describe("useCrimes", () => {
  describe("renders", () => {
    const Crimes = useCrimes;

    it("loading", () => {
      const wrapper = shallow(<Crimes />).find("main");
      expect(wrapper.text()).toEqual("Loading crimes...");
    });
    describe("with", () => {
      const { putCrimes } = useProps();

      beforeEach(() => putCrimes({ crimes: [{ category: "test" }] }));

      it("categories", () => {
        const wrapper = shallow(<Crimes />).find("pre");
        expect(wrapper.isEmptyRender()).toBeFalsy();
      });
      it("filtered", () => {
        const wrapper = shallow(<Crimes />);
        const { putFilter } = useProps();
        putFilter(true);
        expect(wrapper.find("#reset").isEmptyRender()).toBeFalsy();
      });
    });

    it("error", () => {
      const { putError } = useProps();
      putError({ error: "Error loading" });
      const wrapper = shallow(<Crimes />).find("main");
      expect(wrapper.text()).toEqual("Error fetching crimes");
    });
  });
});
