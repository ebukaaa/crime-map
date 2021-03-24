import { useStore } from "./utils";

export function useCrimes() {
  const { crimesStyles, crimeStyles, crimes } = useStore();

  return (
    <main className={crimesStyles}>
      {crimes.map(
        ({
          category,
          id,
          month,
          outcome_status: outcome,
          location: {
            latitude,
            longitude,
            street: { name },
          },
        }) => (
          <aside className={crimeStyles} key={id}>
            <strong>ID: {id}</strong>
            <p>Category: {category}</p>
            <p>Location: {name}</p>
            <p>
              Coordinates: [{latitude}, {longitude}]
            </p>
            {outcome?.category && <p>Outcome: {outcome?.category}</p>}
            <p>Date: {month}</p>
          </aside>
        )
      )}
    </main>
  );
}
