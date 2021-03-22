export async function useApi(request, response) {
  const url = `${
    process.env.CRIME_API
  }?lat=52.629729&lng=-1.131592&date=${new Date().getFullYear()}-01`;
  const data = await fetch(url);
  const crimes = await data.json();

  response.statusCode = 200;
  response.json(JSON.stringify(crimes));
}
export default useApi;
