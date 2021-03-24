import { useAppStore } from "./utils";
import "./style.scss";

export function useApp({ Component, pageProps }) {
  const { Link, SWRConfig, fetcher, crimes } = useAppStore();

  return (
    <main id="app">
      <SWRConfig
        value={{
          fetcher,
          initialData: crimes || pageProps?.crimes,
          dedupingInterval: 5000,
          focusThrottleInterval: 2.16 * 10 ** 7,
        }}
      >
        <Component {...pageProps} />

        <footer>
          <Link href="/">
            <button type="button">Document View</button>
          </Link>
          <Link href="/map">
            <button type="button">Map View</button>
          </Link>
        </footer>
      </SWRConfig>
    </main>
  );
}
export default useApp;
