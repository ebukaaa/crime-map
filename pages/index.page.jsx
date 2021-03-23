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
  const { url } = appProps();
  const data = await fetch(url);
  const crimes = await data.json();

  return {
    props: { crimes },
    revalidate: 1,
  };
}
