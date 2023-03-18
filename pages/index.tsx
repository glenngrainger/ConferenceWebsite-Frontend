import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import Navigation from "../src/components/navigation/navigation";

export default function Home({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div>
      <Navigation isLoggedIn={isLoggedIn} />
    </div>
  );
}

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const session = await getSession(req, res);
  const isLoggedIn = session?.accessToken !== undefined;
  return {
    props: { isLoggedIn },
  };
}
