import { Box, Button, Typography, useTheme } from "@mui/material";
import NoItemSelected from "./noItemSelected";
import OccurrencesList from "./occurrencesList";
import OccurrenceForm from "./occurrenceForm";
import useOccurrenceSectionStore from "./useOccurrenceSectionStore";
import shallow from "zustand/shallow";

const Occurrences = () => {
  const theme = useTheme();
  const occurrenceSection = useOccurrenceSectionStore(
    (state) => ({
      isCurrentlyCreating: state.isCurrentlyCreating,
      setIsCurrentlyCreating: state.setIsCurrentlyCreating,
      occurrence: state.occurrence,
    }),
    shallow
  );
  return (
    <Box sx={{ display: { xs: "block", md: "flex" }, gap: 2 }}>
      <Box sx={{ flex: 1, py: 2, height: "calc(100vh - 120px)" }}>
        <OccurrencesList />
      </Box>
      <Box
        sx={{
          height: "calc(100vh - 120px)",
          flex: 1,
          p: 2,
          borderLeft: `1px solid ${theme.palette.grey[300]}`,
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
                    onClick={() =>
                      occurrenceSection.setIsCurrentlyCreating(false)
                    }
                  >
                    Cancel
                  </Button>
                  <Button>Create</Button>
                </>
              ) : (
                <>
                  <Button color="error">Delete</Button>
                  <Button>Save</Button>
                </>
              )}
            </Box>
            <OccurrenceForm />
          </>
        ) : (
          <NoItemSelected />
        )}
      </Box>
    </Box>
  );
};

export default Occurrences;
