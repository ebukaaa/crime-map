import dynamic from "next/dynamic";

const useContainer = dynamic(
  () => import("./container").then((mod) => mod.useContainer),
  {
    ssr: false,
  }
);

export function useStore() {
  return { Container: useContainer };
}
