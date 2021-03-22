import { SWRConfig } from "swr";
import { useCrimes } from "./crimes";

const url = `${process.env.NEXT_PUBLIC_HOST}/api/crimes/get`;

export async function fetcher(...args) {
  return fetch(...args).then((response) => response?.json());
}

function unmount({ set, value }) {
  return () => set(value);
}

export function useStore() {
  return {
    SWRConfig,
    Crimes: useCrimes,
    fetcher,
  };
}
export function useProps() {
  return { url, unmount };
}
