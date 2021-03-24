import { MapContainer, TileLayer, useMap as Map } from "react-leaflet";
import { mapStyles } from "./style.module.scss";
import "leaflet/dist/leaflet.css";
import { useMarker } from "./marker";

let map;

// const url = `https://api.maptiler.com/maps/bright/256/{z}/{x}/{y}@2x.png?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`;
// const attribution =
//   '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const url = process.env.NEXT_PUBLIC_MAPTILER_API;
const attribution = process.env.NEXT_PUBLIC_MAPTILER_ATTRIBUTION;
const center = [52.3555, -1.3];

function useMapEffect() {
  if (!map) {
    map = Map();
  }
  return null;
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
