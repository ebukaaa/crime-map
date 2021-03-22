import { useStore } from "./utils";

export function useHome() {
  const { home } = useStore();

  return <main className={home}>Home</main>;
}
export default useHome;
