import { useStore } from "./utils";

export function usePage() {
  const { page } = useStore();

  return <main className={page}>Page</main>;
}
export default usePage;
