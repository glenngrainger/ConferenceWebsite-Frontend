import { getAccessToken, getSession, Session } from "@auth0/nextjs-auth0";
import { Box } from "@mui/material";
import Navigation from "../../src/components/navigation/navigation";
import ConferenceSection from "../../src/pages/plan/conferenceSection";
import OrganisationSection from "../../src/pages/plan/organisationSection";
import type { GetServerSideProps, NextPage } from "next";
import PlanPage from "../../src/pages/plan";

export default function Page({ session }: { session: string }) {
  return (
    <Box>
      <Navigation isLoggedIn={true} />
      <PlanPage session={JSON.parse(session) as Session} />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      session: JSON.stringify(session),
    },
  };
};
