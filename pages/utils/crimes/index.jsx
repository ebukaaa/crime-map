import { useStore } from "./utils";

export function useCrimes() {
  const {
    crimesStyles,
    error,
    filtered,
    categories,
    filter,
    crimes,
  } = useStore();

  if (error) {
    return <main>Error fetching crimes</main>;
  }
  if (!crimes) {
    return <main>Loading crimes...</main>;
  }

  return (
    <main className={crimesStyles}>
      <aside>
        {categories?.map((category) => (
          <button
            type="button"
            key={category}
            onClick={filter.bind(null, category)}
          >
            {category}
          </button>
        ))}
        {filtered && (
          <button id="reset" type="button" onClick={filter.bind(null, null)}>
            reset
          </button>
        )}
      </aside>

      <pre>{JSON.stringify(crimes, null, 2)}</pre>
    </main>
  );
}
