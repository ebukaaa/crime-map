import { useState } from "react";
import useSWR, { SWRConfig } from "swr";
import { useStore } from "./utils";

const url = `${process.env.NEXT_PUBLIC_HOST}/api/crimes/get`;

function useCrimes() {
  const { data: crimes, error } = useSWR(url);
  const [filtered, filter] = useState();

  if (error) {
    return <main>Error fetching crimes</main>;
  }
  if (!crimes) {
    return <main>Loading crimes...</main>;
  }
  const categories = [...new Set(crimes.map((crime) => crime.category))];
  const filteredCrimes = filtered
    ? crimes.filter((crime) => crime.category === filtered)
    : crimes;

  return (
    <>
      <aside style={{ margin: "1rem 0" }}>
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={filter.bind(null, category)}
          >
            {category}
          </button>
        ))}
        {filtered && (
          <button type="button" onClick={filter.bind(null, null)}>
            reset
          </button>
        )}
      </aside>

      <pre>{JSON.stringify(filteredCrimes, null, 2)}</pre>
    </>
  );
}

export function useHome({ crimes }) {
  const { home } = useStore();
  const Crimes = useCrimes;

  function fetcher(...args) {
    return fetch(...args).then((response) => response.json());
  }

  return (
    <main className={home}>
      <SWRConfig
        value={{
          fetcher,
          initialData: crimes,
          dedupingInterval: 5000,
          focusThrottleInterval: 8.64 * 10 ** 7,
        }}
      >
        <Crimes />
      </SWRConfig>
    </main>
  );
}
export default useHome;

export async function getStaticProps() {
  const data = await fetch(url);
  const crimes = await data.json();

  return {
    props: { crimes },
    revalidate: 1,
  };
}
