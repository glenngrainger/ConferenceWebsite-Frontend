import { Box, Typography, Button, Menu, Divider } from "@mui/material";
import { AiOutlineDown } from "react-icons/ai";
import AddConferenceModal from "../../../components/modal/conference/addConference/addConferenceModal";
import { ConferenceModalStateProvider } from "../../../components/modal/conference/addConference/useConferenceModalStore";
import AdminAccessModal from "../../../components/modal/organisation/adminAccessModal";
import DeleteOrganisationModal from "../../../components/modal/organisation/deleteOrganisationModal";
import UpdateOrganisationModal from "../../../components/modal/organisation/updateOrganisationModal";
import useConference from "../../../hooks/useConference";
import useMenu from "../hooks/useMenu";

const ConferenceSectionHeader = () => {
  const { conferences } = useConference();
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontSize: "24px" }}>
        {conferences?.data?.length || 0} Conferences
      </Typography>
      <Box sx={{ display: "flex", gap: "12px", ml: "auto" }}>
        {/* <Button>New Conference</Button> */}
        <ManageOrganisationMenu />
      </Box>
    </Box>
  );
};

const ManageOrganisationMenu = () => {
  const { open, anchorEl, handleClick, handleClose } = useMenu();
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        color="secondary"
        endIcon={<AiOutlineDown />}
      >
        Manage
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <ConferenceModalStateProvider>
          <AddConferenceModal modalClosedCallback={handleClose} />
        </ConferenceModalStateProvider>
        <Divider />
        <UpdateOrganisationModal modalClosedCallback={handleClose} />
        <DeleteOrganisationModal modalClosedCallback={handleClose} />
        <AdminAccessModal modalClosedCallback={handleClose} />
      </Menu>
    </>
  );
};

export default ConferenceSectionHeader;
