import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { Box } from "@mui/material";
import Navigation from "../../src/components/navigation/navigation";
import ConferenceSection from "../../src/pages/plan/conferenceSection";
import OrganisationSection from "../../src/pages/plan/organisationSection";
import type { GetServerSideProps, NextPage } from "next";

export default function Page() {
  return (
    <Box>
      <Navigation isLoggedIn={true} />
      <OrganisationSection />
      <ConferenceSection />
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
    props: {},
  };
};
