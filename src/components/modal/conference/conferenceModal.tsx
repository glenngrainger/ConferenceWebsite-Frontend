import React, { forwardRef, useImperativeHandle, useRef } from "react";
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
import ConferenceDetailsForm, {
  AddConferenceHandle,
} from "./conferenceDetailsForm";
import useConferenceModalStore from "./useConferenceModalStore";
import shallow from "zustand/shallow";
import Conference from "../../../models/Conference";
import useConference from "../../../hooks/useConference";
import Occurrences from "./occurrence/occurrences";
import { OccurrenceSectionStateProvider } from "./occurrence/useOccurrenceSectionStore";
import Tabs from "../../tabs/tabs";

export interface ConferenceModalHandle {
  closeModal: () => void;
  openModal: () => void;
}

type ConferenceModalProps = {
  modalClosedCallback: () => void;
  isInitialCreate?: boolean;
  initialConference?: Conference | undefined;
};

const tabOptions = ["Details", "Scheduled"];

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConferenceModal = forwardRef<ConferenceModalHandle, ConferenceModalProps>(
  ({ modalClosedCallback, isInitialCreate, initialConference }, ref) => {
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
      setSelectedNavTab,
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
        setSelectedNavTab: state.setSelectedNavTab,
      }),
      shallow
    );

    useImperativeHandle(ref, () => ({
      closeModal() {
        closeModal();
      },
      openModal() {
        openModalHandler();
      },
    }));

    const openModalHandler = () => {
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

    return (
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
            {selectedNavTab !== "Scheduled" && (
              <Button
                autoFocus
                color="inherit"
                onClick={() => formRef?.current?.triggerSave()}
              >
                {isCurrentlyCreating ? "Create" : "Save"}
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {selectedNavTab === "Details" && (
          <ConferenceDetailsForm
            ref={formRef}
            initialValues={conference || {}}
          />
        )}
        {selectedNavTab === "Scheduled" && (
          <OccurrenceSectionStateProvider>
            <Occurrences />
          </OccurrenceSectionStateProvider>
        )}
        {!isCurrentlyCreating && (
          <Tabs
            tabOptions={tabOptions}
            selectedTab={selectedNavTab}
            tabChangedCallback={(tab) =>
              setSelectedNavTab(tab as "Details" | "Documents" | "Scheduled")
            }
          />
        )}
      </Dialog>
    );
  }
);

export default ConferenceModal;
