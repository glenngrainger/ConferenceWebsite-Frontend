import React, { SyntheticEvent, useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, SpeedDial } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";

const AddOrganisationModal = () => {
  const organisationNameRef = useRef();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addOrganisationHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    // React query update - add to response to cache
    const toPost = {
      name: organisationNameRef.current,
    };
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
          <Box component="form" onSubmit={addOrganisationHandler}>
            <TextField
              ref={organisationNameRef.current}
              autoFocus
              margin="dense"
              id="name"
              label="Organisation name"
              type="text"
              fullWidth
              variant="standard"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddOrganisationModal;
