import { useProps as appProps, useStore } from "./utils";

export function useHome({ crimes }) {
  const { SWRConfig, Crimes, fetcher } = useStore();

  return (
    <SWRConfig
      value={{
        fetcher,
        initialData: crimes,
        dedupingInterval: 5000,
        focusThrottleInterval: 2.16 * 10 ** 7,
      }}
    >
      <Crimes />
    </SWRConfig>
  );
}
export default useHome;

export async function getStaticProps() {
  appProps();
  const data = await fetch(
    `https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=${new Date().getFullYear()}-01`
  );
  const crimes = await data.json();

  return {
    props: { crimes },
    revalidate: 1,
  };
}
