import { useEffect, useState } from "react";
import { useProps as useAppProps } from "../..";

let initFiltered;
let putFilter;

function updateFilter({ filtered, filter }) {
  if (initFiltered !== filtered) {
    initFiltered = filtered;
  }
  if (filter && putFilter !== filter) {
    putFilter = filter;
  }
}

export function useStore() {
  const { unmount, filter: filterCrimes } = useAppProps();

  const [filtered, filter] = useState(null);
  updateFilter({ filtered, filter });
  useEffect(() => unmount({ set: filter }), [unmount]);
  useEffect(() => updateFilter({ filtered }), [filtered]);

  return { filtered, filter: filterCrimes };
}
export function useProps() {
  return {
    initFiltered,
    putFilter,
  };
}
