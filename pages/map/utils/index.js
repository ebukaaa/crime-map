import dynamic from "next/dynamic";

const Map = dynamic(() => import("./contents").then((mod) => mod.useContents), {
  ssr: false,
});

export function useStore() {
  return { Map };
}
