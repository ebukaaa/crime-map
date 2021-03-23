import { useAppProps } from "./utils";
import "./style.scss";

export function useApp({ Component, pageProps }) {
  const { Link } = useAppProps();

  return (
    <main id="app">
      <Component {...pageProps} />

      <footer>
        <Link href="/map">
          <button type="button">Map View</button>
        </Link>
        <Link href="/">
          <button type="button">Document View</button>
        </Link>
      </footer>
    </main>
  );
}
export default useApp;
