import { useStore } from "./utils";

export function useMap() {
  const { alertStyles, isOnline, Container } = useStore();

  return !isOnline ? (
    <p id="alert" className={alertStyles}>
      You need internet to load map
    </p>
  ) : (
    <Container />
  );
}
export default useMap;
