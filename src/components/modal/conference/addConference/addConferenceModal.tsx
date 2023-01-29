import React, { useEffect } from "react";
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
import ConferenceNavigation from "./conferenceNavigation";
import ConferenceDetailsForm from "./conferenceDetailsForm";
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
  isInitialCreate,
}: {
  modalClosedCallback: () => void;
  isInitialCreate?: boolean;
}) => {
  const {
    triggerCreateAPIRequest,
    isOpen,
    openModal,
    closeModal,
    setIsInitialCreate,
  } = useConferenceModalStore(
    (state) => ({
      triggerCreateAPIRequest: state.triggerCreateAPIRequest,
      isOpen: state.isOpen,
      openModal: state.openModal,
      closeModal: state.closeModal,
      setIsOpen: state.setIsOpen,
      setIsInitialCreate: state.setIsInitialCreate,
    }),
    shallow
  );

  useEffect(() => {
    setIsInitialCreate(isInitialCreate || false);
  }, []);

  return (
    <>
      <MenuItem onClick={openModal}>New Conference</MenuItem>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={closeModal}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={closeModal}
              aria-label="close"
            >
              <AiOutlineClose />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              New Conference
            </Typography>
            <Button autoFocus color="inherit" onClick={triggerCreateAPIRequest}>
              Create
            </Button>
          </Toolbar>
        </AppBar>
        <ConferenceDetailsForm />
        <ConferenceNavigation />
      </Dialog>
    </>
  );
};

export default ManageConference;
