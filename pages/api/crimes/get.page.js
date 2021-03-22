// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export async function useApi(request, response) {
  const date = new Date();
  const url = `${
    process.env.CRIME_API
  }?lat=52.629729&lng=-1.131592&date=${date.getFullYear()}-01`;
  const data = await fetch(url);
  const crimes = await data.json();

  response.status(200).json(JSON.stringify(crimes));
}
export default useApi;
