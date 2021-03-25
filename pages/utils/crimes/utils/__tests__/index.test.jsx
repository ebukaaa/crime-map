import { shallow } from "enzyme";
import { useCrimes } from "../..";
import { useStore as AppStore, useProps as appProps } from "../../..";

describe("useCrimes", () => {
  it("renders with outcome.category", () => {
    shallow(<AppStore />);
    const { putCrimes } = appProps();
    putCrimes([
      {
        category: "category",
        id: "id",
        month: "month",
        outcome_status: { category: "outcome.category" },
        location: {
          latitude: "latitude",
          longitude: "longitude",
          street: { name: "name" },
        },
      },
    ]);
    const Crimes = useCrimes;
    const wrapper = shallow(<Crimes />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
