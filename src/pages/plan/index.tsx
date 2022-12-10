import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  SpeedDial,
  SpeedDialAction,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { CgOrganisation } from "react-icons/cg";
import { AiOutlineDown, AiOutlinePlus } from "react-icons/ai";
import OrganisationSection from "./organisationSection";
import ConferenceSection from "./conferenceSection";

const Plan = () => {
  return (
    <Box>
      <OrganisationSection />
      <ConferenceSection />
    </Box>
  );
};

export default Plan;
