import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Box } from "@mui/material";
import Navigation from "../../src/components/navigation/navigation";
import type { GetServerSideProps } from "next";
import PlanPage from "../../src/pages/plan";

export default function Page() {
  return (
    <Box>
      <Navigation isLoggedIn={true} />
      <PlanPage />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();
