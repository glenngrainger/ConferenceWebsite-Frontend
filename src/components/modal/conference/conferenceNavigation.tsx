import {
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import shallow from "zustand/shallow";
import useConferenceModalStore from "./useConferenceModalStore";

const ConferenceNavigation = () => {
  const theme = useTheme();
  const { selectedNavTab, setSelectedNavTab } = useConferenceModalStore(
    (state) => ({
      selectedNavTab: state.selectedNavTab,
      setSelectedNavTab: state.setSelectedNavTab,
    }),
    shallow
  );

  return (
    <BottomNavigation
      showLabels
      value={selectedNavTab}
      onChange={(event, newValue) => {
        setSelectedNavTab(newValue);
      }}
      sx={{
        mt: "auto",
        borderTop: `1px solid ${theme.palette.grey[300]}`,
      }}
    >
      <BottomNavigationAction value="Details" label="Details" />
      <BottomNavigationAction value="Scheduled" label="Scheduled" />
      {/* <BottomNavigationAction value="Documents" label="Documents" /> */}
    </BottomNavigation>
  );
};

export default ConferenceNavigation;
