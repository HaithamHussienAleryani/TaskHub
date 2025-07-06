type HaniProps = {
  params: { id: string };
  loaderData: {
    haniData: { message: string };
  };
};

const Hani = ({ params, loaderData }: HaniProps) => {
  return <div>{loaderData.haniData.message}</div>;
};

export default Hani;
