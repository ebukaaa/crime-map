import { useState } from "react";
import SWR from "swr";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useProps as useAppProps } from "../../../../../../utils";
import { popupStyles } from "./style.module.scss";
import "react-leaflet-markercluster/dist/styles.min.css";

let putActivate;

const eventHandlers = {
  click() {
    putActivate((old) => !old);
  },
};
const icon = new Icon({
  iconUrl: "/svgs/custody.svg",
  iconSize: [25, 25],
});

function updateActive({ activate }) {
  if (activate && putActivate !== activate) {
    putActivate = activate;
  }
}

export function useStore() {
  const { url: dataURL, initCrimes } = useAppProps();
  let crimes;
  const { data } = !crimes && SWR(dataURL);
  crimes = initCrimes || data;

  const [, activate] = useState();
  updateActive({ activate });

  return {
    popupStyles,
    crimes,
    icon,
    MarkerClusterGroup,
    Marker,
    eventHandlers,
    Popup,
  };
}
