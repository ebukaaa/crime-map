import { useEffect, useState } from "react";
import useSWR from "swr";
import { useProps as useAppProps } from "../..";
import { crimesStyles } from "./style.module.scss";

let initFiltered;
let putFilter;
let initError;
function putError({ error }) {
  if (initError === error) {
    return null;
  }
  initError = error;
  return undefined;
}
let initCrimes;
function putCrimes({ crimes }) {
  if (initCrimes === crimes) {
    return null;
  }
  initCrimes = crimes;
  return undefined;
}

export function getCrimes({ crimes }) {
  return initFiltered
    ? crimes.filter((crime) => crime.category === initFiltered)
    : crimes;
}

function updateFilter({ filtered, filter }) {
  if (initFiltered !== filtered) {
    initFiltered = filtered;
  }
  if (filter && putFilter !== filter) {
    putFilter = filter;
  }
}

export function useStore() {
  const { url, unmount } = useAppProps();
  const { data: crimes = initCrimes, error = initError } = useSWR(url);

  const [filtered, filter] = useState();
  updateFilter({ filtered, filter });
  useEffect(() => unmount({ set: filter }), [unmount]);
  useEffect(() => updateFilter({ filtered }), [filtered]);

  const categories = [...new Set(crimes?.map((crime) => crime.category))];

  return {
    crimesStyles,
    error,
    filtered,
    categories,
    crimes: getCrimes({ crimes }),
    filter,
  };
}
export function useProps() {
  return {
    initFiltered,
    putFilter,
    initError,
    putError,
    initCrimes,
    putCrimes,
  };
}
