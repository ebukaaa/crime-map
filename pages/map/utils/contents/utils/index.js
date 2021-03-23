import { useState } from "react";
import useSWR from "swr";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {
  MapContainer,
  TileLayer,
  useMap as Map,
  Marker,
  Popup,
} from "react-leaflet";
import { Icon } from "leaflet";
import { useProps as useAppProps } from "../../../../utils";
import { mapStyles } from "./style.module.scss";
import { useProps as crimesProps } from "../../../../utils/crimes/utils";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";

let map;

const url = `https://api.maptiler.com/maps/bright/256/{z}/{x}/{y}@2x.png?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`;
const attribution =
  '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const center = [52.3555, -1.3];
const icon = new Icon({
  iconUrl: "/svgs/custody.svg",
  iconSize: [25, 25],
});

function useMapEffect() {
  if (!map) {
    map = Map();
  }
  return null;
}
function useMarker() {
  const { url: dataURL } = useAppProps();
  const { initCrimes } = crimesProps();
  const { data } = useSWR(dataURL);
  const crimes = initCrimes || data;

  const [, activate] = useState();

  const eventHandlers = {
    click() {
      activate((old) => !old);
    },
  };

  return !crimes ? (
    <></>
  ) : (
    <MarkerClusterGroup>
      {crimes.map(
        ({
          id,
          location: {
            latitude,
            longitude,
            street: { name },
          },
        }) => (
          <Marker
            key={id}
            position={[latitude, longitude]}
            icon={icon}
            eventHandlers={eventHandlers}
          >
            <Popup>{name}</Popup>
          </Marker>
        )
      )}
    </MarkerClusterGroup>
  );
}

export function useStore() {
  return {
    mapStyles,
    url,
    attribution,
    center,
    TileLayer,
    MapEffect: useMapEffect,
    Marker: useMarker,
    MapContainer,
  };
}
