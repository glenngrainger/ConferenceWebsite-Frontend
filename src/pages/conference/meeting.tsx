import { Box } from "@mui/material";
import Tabs from "../../components/tabs/tabs";

const tabs = ["Stream", "Details"];

const Meeting = () => {
  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}>
      <Tabs
        tabOptions={tabs}
        selectedTab="Stream"
        tabChangedCallback={() => {}}
      />
    </Box>
  );
};

export default Meeting;
