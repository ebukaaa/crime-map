import { SWRConfig } from "swr";
import { useCrimes } from "./crimes";

const url = `${
  process.env.NEXT_PUBLIC_CRIME_API
}?lat=52.629729&lng=-1.131592&date=${new Date().getFullYear()}-01`;

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
