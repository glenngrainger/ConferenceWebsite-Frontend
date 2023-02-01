import React, { forwardRef, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { AiOutlineClose } from "react-icons/ai";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useSnackbar } from "notistack";
import ConferenceNavigation from "./conferenceNavigation";
import ConferenceDetailsForm, {
  AddConferenceHandle,
} from "./conferenceDetailsForm";
import useConferenceModalStore from "./useConferenceModalStore";
import shallow from "zustand/shallow";
import Conference from "../../../models/Conference";
import useConference from "../../../hooks/useConference";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ConferenceModalProps = {
  modalClosedCallback: () => void;
  isInitialCreate?: boolean;
  initialConference?: Conference | undefined;
};

const ConferenceModal = forwardRef<HTMLElement, ConferenceModalProps>(
  (
    { modalClosedCallback, isInitialCreate, initialConference },
    modalTriggerRef
  ) => {
    const formRef = useRef<AddConferenceHandle>(null);
    const { enqueueSnackbar } = useSnackbar();
    const { getConferenceById } = useConference();
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

    // Need to rethink this
    // useEffect(() => {
    //   if (!isOpen) {
    //     modalClosedCallback();
    //   }
    // }, [isOpen]);

    const refOpenClickedHandler = () => {
      setIsInitialCreate(isInitialCreate || false);

      // Set the conference if updating every time the modal is opened
      if (
        !isInitialCreate &&
        initialConference !== undefined &&
        initialConference.id
      ) {
        const conference = getConferenceById(initialConference.id);
        if (conference === undefined) {
          enqueueSnackbar("Conference not found", { variant: "error" });
          return;
        }
        setConference(conference);
      }
      openModal();
    };

    useEffect(() => {
      // Type issue - will need to look into this
      const ref = modalTriggerRef as React.RefObject<HTMLElement>;
      if (ref !== null) {
        ref.current?.addEventListener("click", refOpenClickedHandler);
      }
      return () => {
        if (ref !== null) {
          ref.current?.removeEventListener("click", refOpenClickedHandler);
        }
      };
    }, []);

    return (
      <>
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
                onClick={() => formRef?.current?.triggerSave()}
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
  }
);

export default ConferenceModal;
