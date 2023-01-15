import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { CgOrganisation } from "react-icons/cg";
import usePlanStore, { ViewEnum } from "../store/usePlanStore";
import shallow from "zustand/shallow";
import useOrganisation from "../../../hooks/useOrganisation";
import useOrganisationStore from "../store/useOrganisationStore";
import AddOrganisationModal from "../../../components/modal/organisation/addOrganisationModal";

const OrganisationSection = () => {
  const selectedView = usePlanStore((state) => state.selectedView, shallow);
  const { organisations } = useOrganisation();
  const organisationsList = organisations.data || [];
  const { setSelectedOrganisationId } = useOrganisationStore();
  const setSelectedView = usePlanStore(
    (state) => state.setSelectedView,
    shallow
  );

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
          overflowY: "auto",
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
          {organisationsList.map((organisation) => (
            <ListItem
              key={organisation.id}
              disablePadding
              onClick={() => {
                setSelectedOrganisationId(organisation.id);
                setSelectedView(ViewEnum.ConferenceHome);
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <CgOrganisation />
                </ListItemIcon>
                <ListItemText primary={organisation.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <AddOrganisationModal />
      </Box>
    </Box>
  );
};

export default OrganisationSection;
