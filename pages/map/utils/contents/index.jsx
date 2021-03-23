import { useStore } from "./utils";

export function useContents() {
  const {
    mapStyles,
    url,
    attribution,
    center,
    TileLayer,
    MapContainer,
    MapEffect,
    Marker,
  } = useStore();

  return (
    <MapContainer
      className={mapStyles}
      center={center}
      zoom={7}
      zoomControl={false}
      attributionControl={false}
      minZoom={6}
    >
      <MapEffect />
      <TileLayer url={url} attribution={attribution} />
      <Marker />
    </MapContainer>
  );
}
