import {
  Box,
  Typography,
  Button,
  Menu,
  Divider,
  MenuItem,
} from "@mui/material";
import { useRef } from "react";
import { AiOutlineDown } from "react-icons/ai";
import ConferenceModal, {
  ConferenceModalHandle,
} from "../../../components/modal/conference/conferenceModal";
import { ConferenceModalStateProvider } from "../../../components/modal/conference/useConferenceModalStore";
import AdminAccessModal from "../../../components/modal/organisation/adminAccessModal";
import UpdateOrganisationModal, {
  UpdateOrganisationModalHandle,
} from "../../../components/modal/organisation/updateOrganisationModal";
import DeleteModal, {
  DeleteModalHandle,
} from "../../../components/modal/shared/deleteModal";
import useConference from "../../../hooks/useConference";
import useOrganisation from "../../../hooks/useOrganisation";
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
        <ManageOrganisationMenu />
      </Box>
    </Box>
  );
};

const ManageOrganisationMenu = () => {
  const conferenceModalRef = useRef<ConferenceModalHandle>(null);
  const updateOrganisationModalRef =
    useRef<UpdateOrganisationModalHandle>(null);
  const deleteOrganisationModalRef = useRef<DeleteModalHandle>(null);
  const { deleteOrganisationMutation, getCurrentSelectedOrganisation } =
    useOrganisation();
  const selectedOrganisation = getCurrentSelectedOrganisation();
  const { open, anchorEl, handleClick, handleClose } = useMenu();

  const deleteOrganisationHandler = async () => {
    await deleteOrganisationMutation.mutateAsync(
      selectedOrganisation?.id || ""
    );
  };

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
        <MenuItem
          onClick={() => {
            conferenceModalRef?.current?.openModal();
            handleClose();
          }}
        >
          New Conference
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            updateOrganisationModalRef?.current?.openModal();
            handleClose();
          }}
        >
          Update Organisation
        </MenuItem>
        <MenuItem
          onClick={() => {
            deleteOrganisationModalRef?.current?.showModal();
            handleClose();
          }}
        >
          Delete Organisation
        </MenuItem>
        {/* <AdminAccessModal modalClosedCallback={handleClose} /> */}
      </Menu>
      <ConferenceModalStateProvider>
        <ConferenceModal
          ref={conferenceModalRef}
          modalClosedCallback={handleClose}
          isInitialCreate={true}
        />
      </ConferenceModalStateProvider>
      <UpdateOrganisationModal ref={updateOrganisationModalRef} />
      <DeleteModal
        ref={deleteOrganisationModalRef}
        resourceType="Organisation"
        confirmCallback={deleteOrganisationHandler}
        extraDetails={
          <>{selectedOrganisation?.name} will be permanently deleted</>
        }
      />
    </>
  );
};

export default ConferenceSectionHeader;
