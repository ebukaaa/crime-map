import { MapContainer, TileLayer, useMap as Map } from "react-leaflet";
import { useMarker } from "./marker";
import { mapStyles } from "./style.module.scss";
import "leaflet/dist/leaflet.css";

let map;

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
