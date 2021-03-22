// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export function useApi(request, response) {
  response.statusCode = 200;
  response.json({ name: "John Doe" });
}
export default useApi;
