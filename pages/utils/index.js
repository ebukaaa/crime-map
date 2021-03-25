import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SWR, { SWRConfig } from "swr";
import { useProps as crimesProps } from "./crimes/utils";
import { useResetButton } from "./reset-button";
import { homeStyles, controlsStyles } from "./style.module.scss";

let initCrimes;
let putCrimes;
let initError;
let putError;

const latitude = 51.509865;
const longitude = -0.118092;
const url = `${
  process.env.NEXT_PUBLIC_CRIME_API
}?lat=${latitude}&lng=${longitude}&date=${new Date().getFullYear()}-01`;

async function fetcher(...args) {
  return fetch(...args).then((response) => response?.json());
}

function unmount({ set, value }) {
  return () => set(value);
}

function filter(value) {
  const { putFilter } = crimesProps();
  putFilter(value);
}

export function checkData({ crimes, SWRData }) {
  if (crimes || !SWRData) {
    return;
  }
  putCrimes(SWRData);
}
export function checkError({ SWRError }) {
  if (!SWRError) {
    return;
  }
  putError(SWRError);
}

function updateCrimes({ crimes, setCrimes }) {
  if (initCrimes !== crimes) {
    initCrimes = crimes;
  }
  if (setCrimes && putCrimes !== setCrimes) {
    putCrimes = setCrimes;
  }
}
function updateError({ error, setError }) {
  if (initError !== error) {
    initError = error;
  }
  if (setError && putError !== setError) {
    putError = setError;
  }
}

export function useStore({ data }) {
  const { data: SWRData, error: SWRError } = !data && SWR(url);

  const [crimes, setCrimes] = useState(data);
  updateCrimes({ crimes, setCrimes });
  useEffect(() => unmount({ set: setCrimes }), []);
  useEffect(() => updateCrimes({ crimes }), [crimes]);

  const [error, setError] = useState(null);
  updateError({ error, setError });
  useEffect(() => unmount({ set: setError }), []);
  useEffect(() => updateError({ error }), [error]);

  useEffect(() => checkData({ crimes, SWRData }), [crimes, SWRData]);

  useEffect(() => checkError({ SWRError }), [SWRError]);

  const { useCrimes } = crimesProps();

  return {
    homeStyles,
    controlsStyles,
    error,
    crimes,
    categories: useMemo(
      () => [...new Set(crimes?.map(({ category }) => category))],
      [crimes]
    ),
    filter,
    Reset: useResetButton,
    Crimes: useCrimes,
  };
}
export function useAppStore() {
  return {
    Link,
    SWRConfig,
    fetcher,
    crimes: initCrimes,
  };
}
export function useProps() {
  return {
    url,
    initCrimes,
    putCrimes,
    initError,
    putError,
    filter,
    unmount,
  };
}
