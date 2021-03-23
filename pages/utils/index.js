import { SWRConfig } from "swr";
import { useCrimes } from "./crimes";

const url = `https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=${new Date().getFullYear()}-01`;
// `${process.env.NEXT_PUBLIC_HOST}/api/crimes/get`;

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
