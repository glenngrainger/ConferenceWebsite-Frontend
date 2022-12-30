import { Box } from "@mui/material";
import BackToOrganisationButton from "../organisationSection/backToOrganisationButton";
import usePlanStore, { ViewEnum } from "../store/usePlanStore";
import ConferenceSectionGrid from "./grid";
import ConferenceSectionHeader from "./header";

const ConferenceSection = () => {
  const selectedView = usePlanStore((state) => state.selectedView);
  return (
    <Box
      sx={{
        ml: { sx: "0px", md: "300px" },
        mt: "64px",
        display: {
          xs: `${selectedView === ViewEnum.ConferenceHome ? "block" : "none"}`,
          md: "block",
        },
      }}
    >
      <ConferenceSectionHeader />
      <ConferenceSectionGrid />
      <BackToOrganisationButton />
    </Box>
  );
};

export default ConferenceSection;
