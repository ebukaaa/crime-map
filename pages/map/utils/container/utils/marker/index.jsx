import { useStore } from "./utils";

export function useMarker() {
  const {
    popupStyles,
    crimes,
    MarkerClusterGroup,
    Marker,
    icon,
    eventHandlers,
    Popup,
  } = useStore();

  return !crimes ? (
    <></>
  ) : (
    <MarkerClusterGroup>
      {crimes.map(
        ({
          id,
          category,
          outcome_status: outcome,
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
            <Popup className={popupStyles}>
              <strong>ID: {id}</strong>
              <p>
                <span>Category:</span> {category}
              </p>
              <p>
                <span>Location:</span> {name}
              </p>
              {outcome?.category && (
                <p>
                  <span>Outcome:</span> {outcome?.category}
                </p>
              )}
            </Popup>
          </Marker>
        )
      )}
    </MarkerClusterGroup>
  );
}
