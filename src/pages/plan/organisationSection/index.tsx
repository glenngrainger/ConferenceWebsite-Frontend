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
  IconButton,
  Button,
} from "@mui/material";
import { CgOrganisation } from "react-icons/cg";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdCloseCircleOutline } from "react-icons/io";
import usePlanStore, { ViewEnum } from "../store/usePlanStore";

const OrganisationSection = () => {
  const selectedView = usePlanStore((state) => state.selectedView);
  return (
    <Box
      sx={{
        position: "fixed",
        width: { xs: "100vw", md: "300px" },
        display: {
          xs: `${selectedView === ViewEnum.Organisation ? "block" : "none"} `,
          md: "block",
        },
        height: "100vh",
        bottom: 0,
        left: 0,
      }}
    >
      <Box
        sx={{
          mt: "64px",
          width: "100%",
          height: "calc(100% - 64px)",
          position: "absolute",
          borderRight: 1,
          borderColor: "grey.300",
        }}
      >
        <CssBaseline />
        {/* <ListHeader /> */}
        <Divider sx={{ mt: 2 }}>Organisations</Divider>
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CgOrganisation />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <CloseButton />
        <ManageOrganisationSpeedDial />
      </Box>
    </Box>
  );
};

const actions = [
  { icon: <AiOutlinePlus />, name: "Copy" },
  { icon: <AiOutlinePlus />, name: "Save" },
  { icon: <AiOutlinePlus />, name: "Print" },
  { icon: <AiOutlinePlus />, name: "Share" },
];

const CloseButton = () => {
  const setSelectedView = usePlanStore((state) => state.setSelectedView);
  // Temp
  return (
    <Button
      sx={{
        position: "absolute",
        bottom: 20,
        left: 20,
        display: { md: "none" },
      }}
      startIcon={<IoMdCloseCircleOutline />}
      color="secondary"
      variant="outlined"
      onClick={() => setSelectedView(ViewEnum.ConferenceHome)}
    >
      Close
    </Button>
  );
};

const ManageOrganisationSpeedDial = () => {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<AiOutlinePlus />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
};

export default OrganisationSection;
