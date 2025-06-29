import PrepDetails from "./PrepDetails";


interface PrepDetailsProps {
  params: {
    prepid: string;
  };
}

const PrepDetailsPage = async ({ params }: PrepDetailsProps) => {
  const { prepid } = await params;

  return <PrepDetails prepid={prepid} />;
};

export default PrepDetailsPage;
