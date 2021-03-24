import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useProps as useAppProps } from "../..";
import { useProps as resetButtonProps } from "../../reset-button/utils";
import { crimesStyles, crimeStyles } from "./style.module.scss";

let initFiltered;
let putFilter;

const useCrimes = dynamic(() => import("..").then((mod) => mod.useCrimes));

function updateFilter({ filtered, filter }) {
  if (initFiltered !== filtered) {
    initFiltered = filtered;
  }
  if (filter && putFilter !== filter) {
    putFilter = filter;
  }
}

export function useStore() {
  const { unmount, initCrimes: crimes } = useAppProps();

  const [filtered, filter] = useState();
  updateFilter({ filtered, filter });
  useEffect(() => unmount({ set: filter }), [unmount]);
  useEffect(() => updateFilter({ filtered }), [filtered]);

  useEffect(() => {
    const { putFilter: resetFilter } = resetButtonProps();
    resetFilter(filtered);
  }, [filtered]);

  return {
    crimesStyles,
    crimeStyles,
    crimes: useMemo(
      () =>
        filtered
          ? crimes.filter((crime) => crime.category === filtered)
          : crimes,
      [filtered, crimes]
    ),
  };
}
export function useProps() {
  return {
    useCrimes,
    initFiltered,
    putFilter,
  };
}
