import "./style.scss";

export function useApp({ Component, pageProps }) {
  return (
    <main id="app">
      <Component {...pageProps} />
    </main>
  );
}
export default useApp;
