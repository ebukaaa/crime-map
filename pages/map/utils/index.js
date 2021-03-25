import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useProps as useAppProps } from "../../utils";
import { alertStyles } from "./style.module.scss";

let initOnline;
let putOnline;

export const useContainer = dynamic(
  () => import("./container").then((mod) => mod.useContainer),
  {
    ssr: false,
  }
);

function updateOnline({ isOnline, setOnline }) {
  if (initOnline !== isOnline) {
    initOnline = isOnline;
  }
  if (setOnline && putOnline !== setOnline) {
    putOnline = setOnline;
  }
}

export function useStore() {
  const { unmount } = useAppProps();

  const [isOnline, setOnline] = useState(false);
  updateOnline({ isOnline, setOnline });
  useEffect(() => unmount({ set: setOnline }), [unmount]);
  useEffect(() => updateOnline({ isOnline }), [isOnline]);

  useEffect(() => setOnline(navigator.onLine), []);

  return { alertStyles, isOnline, Container: useContainer };
}
export function useProps() {
  return {
    initOnline,
    putOnline,
  };
}
