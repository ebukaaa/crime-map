import { useStore } from "./utils";

export function useMap() {
  const { Container } = useStore();

  return <Container />;
}

export default useMap;
