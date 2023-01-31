import React, { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { AiOutlineClose } from "react-icons/ai";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { CardActions, MenuItem } from "@mui/material";
import ConferenceNavigation from "./conferenceNavigation";
import ConferenceDetailsForm, {
  AddConferenceHandle,
} from "./conferenceDetailsForm";
import useConferenceModalStore from "./useConferenceModalStore";
import shallow from "zustand/shallow";
import Conference from "../../../models/Conference";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConferenceModal = ({
  openType,
  modalClosedCallback,
  isInitialCreate,
  initialConference,
}: {
  modalClosedCallback: () => void;
  isInitialCreate?: boolean;
  openType?: string;
  initialConference?: Conference | undefined;
}) => {
  const formRef = useRef<AddConferenceHandle>(null);

  const {
    isOpen,
    openModal,
    closeModal,
    setIsInitialCreate,
    isCurrentlyCreating,
    conference,
    setConference,
    selectedNavTab,
  } = useConferenceModalStore(
    (state) => ({
      isOpen: state.isOpen,
      openModal: state.openModal,
      closeModal: state.closeModal,
      setIsOpen: state.setIsOpen,
      setIsInitialCreate: state.setIsInitialCreate,
      isCurrentlyCreating: state.isCurrentlyCreating,
      conference: state.conference,
      setConference: state.setConference,
      selectedNavTab: state.selectedNavTab,
    }),
    shallow
  );

  useEffect(() => {
    setIsInitialCreate(isInitialCreate || false);

    // Set the conference if updating every time the modal is opened
    if (!isInitialCreate && initialConference !== undefined) {
      setConference(initialConference);
    }
  }, [isOpen]);

  return (
    <>
      {openType === "grid" ? (
        <CardActions disableSpacing>
          <Button size="small" onClick={openModal}>
            Schedule
          </Button>
        </CardActions>
      ) : (
        <MenuItem onClick={openModal}>New Conference</MenuItem>
      )}
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
              {isCurrentlyCreating ? "New Conference" : conference?.name}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => formRef?.current?.addConference()}
            >
              {/* <Button autoFocus color="inherit" onClick={triggerAPIRequest}> */}
              {isCurrentlyCreating ? "Create" : "Save"}
            </Button>
          </Toolbar>
        </AppBar>
        {selectedNavTab === "Details" && (
          <ConferenceDetailsForm
            ref={formRef}
            initialValues={conference || {}}
          />
        )}
        {!isCurrentlyCreating && <ConferenceNavigation />}
      </Dialog>
    </>
  );
};

export default ConferenceModal;
