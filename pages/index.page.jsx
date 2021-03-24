import { useProps as appProps, useStore } from "./utils";

export function useHome({ crimes: data }) {
  const {
    homeStyles,
    controlsStyles,
    error,
    categories,
    crimes,
    Crimes,
    Reset,
    filter,
  } = useStore({ data });

  if (error) {
    return <main>{error}</main>;
  }

  return !crimes ? (
    <main>Loading crimes...</main>
  ) : (
    <main className={homeStyles}>
      <header className={controlsStyles}>
        {categories?.map((category) => (
          <button
            type="button"
            key={category}
            onClick={filter.bind(null, category)}
          >
            {category}
          </button>
        ))}
        <Reset />
      </header>

      <Crimes />
    </main>
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
