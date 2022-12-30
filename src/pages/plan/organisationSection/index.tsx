import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SpeedDial,
  Button,
  Typography,
} from "@mui/material";
import { CgOrganisation } from "react-icons/cg";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdCloseCircleOutline } from "react-icons/io";
import usePlanStore, { ViewEnum } from "../store/usePlanStore";
import shallow from "zustand/shallow";
import useOrganisationSection from "./useOrganisationSection";
import useOrganisationStore from "../store/useOrganisationStore";
import AddOrganisationModal from "../../../components/modal/addOrganisationModal";

const OrganisationSection = () => {
  const selectedView = usePlanStore((state) => state.selectedView, shallow);
  const { organisations } = useOrganisationSection();
  const organisationsList = organisations.data || [];
  const { selectedOrganisationId, setSelectedOrganisationId } =
    useOrganisationStore();

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
        <Divider sx={{ mt: 2 }}>Organisations</Divider>
        {organisationsList.length === 0 && (
          <Typography sx={{ m: 1 }} variant="body2" color="text.secondary">
            No admin access to any organisations. Add a new organisation to get
            started
          </Typography>
        )}
        <List>
          {organisationsList.map((organisation, index) => (
            <ListItem key={organisation.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CgOrganisation />
                </ListItemIcon>
                <ListItemText primary={organisation.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <CloseButton />
        <AddOrganisationModal />
      </Box>
    </Box>
  );
};

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

export default OrganisationSection;
