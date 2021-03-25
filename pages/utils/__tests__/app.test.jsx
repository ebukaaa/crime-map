import { shallow } from "enzyme";
import { useApp } from "../../_app.page";

describe("app", () => {
  const Component = jest.fn();
  const pageProps = {};

  test("renders", () => {
    function App() {
      return useApp({ Component, pageProps });
    }
    const wrapper = shallow(<App />).find("#app");
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
