import Hani from "~/screens/Hani/Hani";

import type { Route } from "./+types/hani";

export const loader = async ({ params }: Route.LoaderArgs) => {
  console.log(`Fetching data for hani with id: ${params.id}`);
  await new Promise((r) => setTimeout(r, 500));
  const haniData = { message: `Hello from the server, Hani ${params.id}!` };
  return { haniData };
};

const HaniRoute = ({ loaderData, params }: Route.ComponentProps) => {
  return <Hani loaderData={loaderData} params={params} />;
};

export default HaniRoute;
