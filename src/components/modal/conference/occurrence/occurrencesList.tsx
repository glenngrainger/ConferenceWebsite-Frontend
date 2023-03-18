import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import moment from "moment";
import shallow from "zustand/shallow";
import useOccurrence from "../../../../hooks/useOccurrence";
import useOccurrenceSectionStore from "./useOccurrenceSectionStore";

const OccurrencesList = () => {
  const { occurrences } = useOccurrence();
  const {
    setIsCurrentlyCreating,
    isCurrentlyCreating,
    selectedOccurrence,
    setOccurrence,
  } = useOccurrenceSectionStore(
    (state) => ({
      setIsCurrentlyCreating: state.setIsCurrentlyCreating,
      isCurrentlyCreating: state.isCurrentlyCreating,
      selectedOccurrence: state.occurrence,
      setOccurrence: state.setOccurrence,
    }),
    shallow
  );
  const occurrencesList = occurrences.data || [];
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 500, color: "text.secondary" }}
        >
          {occurrencesList.length} Occurrences found
        </Typography>
        <Button
          sx={{ visibility: isCurrentlyCreating ? "hidden" : "visible" }}
          onClick={() => setIsCurrentlyCreating(true)}
        >
          Create
        </Button>
      </Box>
      <List sx={{ overflow: "auto", height: "calc(100% - 36px)" }}>
        {occurrencesList.map((occurrence) => (
          <ListItem key={occurrence.id}>
            <ListItemButton
              selected={occurrence?.id === selectedOccurrence?.id}
              onClick={() => setOccurrence(occurrence)}
            >
              <ListItemText>
                {moment
                  .utc(occurrence.dateTime, "YYYY-MM-DD HH:mm")
                  .local()
                  .format("dddd Do MMMM YYYY HH:mm")}
              </ListItemText>
              <ListItemText sx={{ textAlign: "end" }}>
                {occurrence.duration} mins
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
        {occurrencesList.length === 0 && (
          <Typography variant="body1" sx={{ p: 2 }}>
            No results found
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default OccurrencesList;
