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
let putCrimes;
// function putCrimes({ crimes }) {
//   if (initCrimes === crimes) {
//     return null;
//   }
//   initCrimes = crimes;
//   return undefined;
// }

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
function updateCrimes({ crimes, setCrimes }) {
  if (initCrimes !== crimes) {
    initCrimes = crimes;
  }
  if (setCrimes && putCrimes !== setCrimes) {
    putCrimes = setCrimes;
  }
}

export function useStore() {
  const { url, unmount } = useAppProps();
  const { data = initCrimes, error = initError } = useSWR(url);

  const [crimes, setCrimes] = useState(data);
  updateCrimes({ crimes, setCrimes });
  useEffect(() => unmount({ set: setCrimes }), [unmount]);
  useEffect(() => updateCrimes({ crimes }), [crimes]);

  const [filtered, filter] = useState();
  updateFilter({ filtered, filter });
  useEffect(() => unmount({ set: filter }), [unmount]);
  useEffect(() => updateFilter({ filtered }), [filtered]);

  useEffect(() => {
    if (!data) {
      return;
    }
    setCrimes(data);
  }, [data]);

  const categories = [...new Set(crimes?.map(({ category }) => category))];

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
