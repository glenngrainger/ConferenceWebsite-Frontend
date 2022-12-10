import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import usePlanStore, { ViewEnum } from "../store/usePlanStore";
import BackToOrganisationButton from "./backToOrganisationButton";

const EmptyTemplate = () => {
  const theme = useTheme();
  const selectedView = usePlanStore((state) => state.selectedView);
  return (
    <Box
      sx={{
        ml: { sx: "0px", md: "300px" },
        mt: "64px",
        height: "calc(100vh - 64px)",
        display: {
          xs: `${selectedView === ViewEnum.ConferenceHome ? "flex" : "none"}`,
          md: "flex",
        },
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.grey[200],
      }}
    >
      <Typography variant="subtitle1">No organisation selected</Typography>
      <BackToOrganisationButton />
    </Box>
  );
};

export default EmptyTemplate;
