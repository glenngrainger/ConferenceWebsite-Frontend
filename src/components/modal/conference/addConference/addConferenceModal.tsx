import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { AiOutlineClose } from "react-icons/ai";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import ConferenceNavigation from "./conferenceNavigation";
import ConferenceDetailsForm from "./conferenceDetailsForm";
import useConference from "../../../../hooks/useConference";
import useConferenceModalStore from "./useConferenceModalStore";
import shallow from "zustand/shallow";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManageConference = ({
  modalClosedCallback,
}: {
  modalClosedCallback: () => void;
}) => {
  const { triggerCreateRequest, isOpen, setIsOpen } = useConferenceModalStore(
    (state) => ({
      triggerCreateRequest: state.triggerCreateRequest,
      isOpen: state.isOpen,
      setIsOpen: state.setIsOpen,
    }),
    shallow
  );

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    modalClosedCallback();
  };

  return (
    <div>
      <MenuItem
        onClick={() => {
          handleClickOpen();
        }}
      >
        New Conference
      </MenuItem>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <AiOutlineClose />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              New Conference
            </Typography>
            <Button autoFocus color="inherit" onClick={triggerCreateRequest}>
              Create
            </Button>
          </Toolbar>
        </AppBar>
        <ConferenceDetailsForm />
        {/* <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List> */}
        <ConferenceNavigation />
      </Dialog>
    </div>
  );
};

export default ManageConference;
