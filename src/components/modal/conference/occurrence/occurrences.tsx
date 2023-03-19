import { Box, Button, Typography, useTheme } from "@mui/material";
import NoItemSelected from "./noItemSelected";
import OccurrencesList from "./occurrencesList";
import OccurrenceForm, { AddOccurrenceHandle } from "./occurrenceForm";
import useOccurrenceSectionStore from "./useOccurrenceSectionStore";
import shallow from "zustand/shallow";
import { useRef } from "react";
import DeleteModal, { DeleteModalHandle } from "../../shared/deleteModal";
import useOccurrence from "../../../../hooks/useOccurrence";

const Occurrences = () => {
  const occurrenceFormRef = useRef<AddOccurrenceHandle>(null);
  const deleteModalRef = useRef<DeleteModalHandle>(null);
  const theme = useTheme();
  const occurrenceSection = useOccurrenceSectionStore(
    (state) => ({
      isCurrentlyCreating: state.isCurrentlyCreating,
      setIsCurrentlyCreating: state.setIsCurrentlyCreating,
      occurrence: state.occurrence,
      currentView: state.currentView,
      setCurrentView: state.setCurrentView,
    }),
    shallow
  );
  const { deleteOccurrenceMutation } = useOccurrence();

  const deleteOccurrenceHandler = async () => {
    await deleteOccurrenceMutation.mutateAsync(
      occurrenceSection?.occurrence?.id || ""
    );
  };

  return (
    <Box sx={{ display: { xs: "block", md: "flex" }, gap: 2 }}>
      <Box
        sx={{
          flex: 1,
          py: 2,
          height: "calc(100vh - 120px)",
          display: {
            xs: occurrenceSection.currentView !== "list" ? "none" : "block",
            md: "block",
          },
        }}
      >
        <OccurrencesList />
      </Box>
      <Box
        sx={{
          height: "calc(100vh - 120px)",
          flex: 1,
          p: 2,
          borderLeft: `1px solid ${theme.palette.grey[300]}`,
          display: {
            xs: occurrenceSection.currentView !== "form" ? "none" : "block",
            md: "block",
          },
        }}
      >
        {occurrenceSection.isCurrentlyCreating ||
        occurrenceSection.occurrence ? (
          <>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 500, color: "text.secondary", mr: "auto" }}
              >
                Details
              </Typography>
              {occurrenceSection.isCurrentlyCreating ? (
                <>
                  <Button
                    color="warning"
                    onClick={() => {
                      occurrenceSection.setIsCurrentlyCreating(false);
                      occurrenceSection.setCurrentView("list");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => occurrenceFormRef?.current?.triggerSave()}
                  >
                    Create
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="secondary"
                    sx={{ display: { xs: "block", md: "none" } }}
                    onClick={() => {
                      occurrenceSection.setIsCurrentlyCreating(false);
                      occurrenceSection.setCurrentView("list");
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    color="error"
                    onClick={deleteModalRef?.current?.showModal}
                  >
                    Delete
                  </Button>
                  {/* <Button>Save</Button> */}
                </>
              )}
            </Box>
            <OccurrenceForm
              ref={occurrenceFormRef}
              initialValues={occurrenceSection.occurrence}
            />
          </>
        ) : (
          <NoItemSelected />
        )}
      </Box>
      <DeleteModal
        ref={deleteModalRef}
        resourceType="Occurrence"
        confirmCallback={deleteOccurrenceHandler}
      />
    </Box>
  );
};

export default Occurrences;
