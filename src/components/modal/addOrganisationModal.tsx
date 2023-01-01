import React, { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, SpeedDial, TextareaAutosize } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import useOrganisationSection from "../../pages/plan/organisationSection/useOrganisationSection";
import { ReturnErrorProps } from "../../pages/plan/hooks/useErrors";

const AddOrganisationModal = () => {
  const { addOrganisationMutation, addValidationErrors } =
    useOrganisationSection();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addOrganisationHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    const toPost = {
      name,
      description,
    };

    await addOrganisationMutation.mutateAsync(toPost);
    handleClose();
  };

  return (
    <>
      <SpeedDial
        ariaLabel="Add organisation button"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<AiOutlinePlus />}
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Organisation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will be added as an admin to the organisation. Other user access
            can be added once created
          </DialogContentText>
          <Box component="form">
            <TextField
              value={name}
              autoFocus
              margin="dense"
              id="name"
              label="Organisation name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setName(e.target.value)}
              {...ReturnErrorProps(
                "Name",
                addValidationErrors.validationErrors
              )}
            />
            <TextField
              value={description}
              margin="dense"
              id="standard-multiline-static"
              label="Organisation summary"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="standard"
              onChange={(e) => setDescription(e.target.value)}
              {...ReturnErrorProps(
                "Description",
                addValidationErrors.validationErrors
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addOrganisationHandler}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddOrganisationModal;
