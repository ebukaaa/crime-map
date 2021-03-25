import { shallow } from "enzyme";
import { useHome, getStaticProps } from "../../index.page";
import { useProps } from "..";

describe("useHome", () => {
  describe("renders", () => {
    it("loading", () => {
      const Home = useHome;
      const wrapper = shallow(<Home />).find("main");
      expect(wrapper.text()).toEqual("Loading crimes...");
    });

    describe("with crimes", () => {
      function Home() {
        return useHome({
          crimes: [{ category: "test" }],
        });
      }

      it("error", () => {
        const wrapper = shallow(<Home />);
        const { putError } = useProps();
        putError("Error fetching data");
        expect(wrapper.find("main").text()).toEqual(
          "Error fetching crimes data"
        );
      });
      it("data", () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.isEmptyRender()).toBeFalsy();
      });
    });
  });

  describe("getStaticProps", () => {
    const json = jest.fn();
    global.fetch = jest.fn();

    test("returns props", async () => {
      jest.spyOn(global, "fetch").mockResolvedValueOnce({ json });
      const { props, revalidate } = await getStaticProps();
      expect(typeof props).toEqual("object");
      expect(typeof revalidate).toEqual("number");
    });
  });
});
