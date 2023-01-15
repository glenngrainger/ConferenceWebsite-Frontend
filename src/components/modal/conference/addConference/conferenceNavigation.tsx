import {
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";

const ConferenceNavigation = () => {
  const theme = useTheme();

  return (
    <></>
    // <BottomNavigation
    //   showLabels
    //   // value={value}
    //   // onChange={(event, newValue) => {
    //   //   setValue(newValue);
    //   // }}
    //   sx={{
    //     mt: "auto",
    //     borderTop: `1px solid ${theme.palette.grey[300]}`,
    //   }}
    // >
    //   <BottomNavigationAction label="Recents" icon={<AiOutlineClose />} />
    //   <BottomNavigationAction label="Favorites" />
    //   <BottomNavigationAction label="Nearby" />
    // </BottomNavigation>
  );
};

export default ConferenceNavigation;
