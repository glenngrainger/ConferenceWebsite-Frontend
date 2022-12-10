import { Box, Typography, Button, Menu, MenuItem } from "@mui/material";
import { AiOutlinePlus, AiOutlineDown } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";
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

const BackToOrganisationButton = () => {
  const setSelectedView = usePlanStore((state) => state.setSelectedView);
  return (
    <Button
      sx={{
        position: "fixed",
        bottom: 20,
        left: 20,
        display: { md: "none" },
      }}
      startIcon={<MdArrowBackIosNew />}
      color="secondary"
      variant="contained"
      onClick={() => setSelectedView(ViewEnum.Organisation)}
    >
      Back to Organisations
    </Button>
  );
};

export default ConferenceSection;
