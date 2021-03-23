import { useStore } from "./utils";

export function useMap() {
  const { Map } = useStore();

  return <Map />;
}

export default useMap;
