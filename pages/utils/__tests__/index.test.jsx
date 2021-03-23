import { shallow } from "enzyme";
import { useHome, getStaticProps } from "../../index.page";

describe("useHome", () => {
  it("renders", () => {
    function Home() {
      return useHome({
        crimes: [],
      });
    }
    const wrapper = shallow(<Home />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  describe("getStaticProps", () => {
    global.fetch = () => ({
      json: jest.fn(() => Promise.resolve()),
    });

    test("returns props", async () => {
      const { props, revalidate } = await getStaticProps();
      expect(typeof props).toEqual("object");
      expect(typeof revalidate).toEqual("number");
    });
  });
});
