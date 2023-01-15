import React, { SyntheticEvent, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText, MenuItem } from "@mui/material";
import useOrganisationSection from "../../../pages/plan/organisationSection/useOrganisationSection";
import useOrganisationStore from "../../../pages/plan/store/useOrganisationStore";
import shallow from "zustand/shallow";

const DeleteOrganisationModal = ({
  modalClosedCallback,
}: {
  modalClosedCallback: () => void;
}) => {
  const { deleteOrganisationMutation, getCurrentSelectedOrganisation } =
    useOrganisationSection();
  const selectedOrganisationId = useOrganisationStore(
    (state) => state.selectedOrganisationId,
    shallow
  );
  const selectedOrganisation = getCurrentSelectedOrganisation();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (selectedOrganisation === undefined) return;
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    modalClosedCallback();
  };

  const deleteOrganisationHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    await deleteOrganisationMutation.mutateAsync(
      selectedOrganisation?.id || ""
    );
    handleClose();
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          handleClickOpen();
        }}
      >
        Delete Organisation
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete {selectedOrganisation?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the organisation? This action cannot
            be reversed
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="error" onClick={deleteOrganisationHandler}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteOrganisationModal;
