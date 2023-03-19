import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import { Box } from "@mui/material";
import Meeting from "../../src/pages/conference/meeting";

export default function Home({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <Box>
      <Meeting />
    </Box>
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
