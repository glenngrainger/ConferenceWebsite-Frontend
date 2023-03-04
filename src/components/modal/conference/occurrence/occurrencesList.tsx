import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import shallow from "zustand/shallow";
import useOccurrence from "../../../../hooks/useOccurrence";
import useOccurrenceSectionStore from "./useOccurrenceSectionStore";

const OccurrencesList = () => {
  const { occurrences } = useOccurrence();
  const { setIsCurrentlyCreating, isCurrentlyCreating } =
    useOccurrenceSectionStore(
      (state) => ({
        setIsCurrentlyCreating: state.setIsCurrentlyCreating,
        isCurrentlyCreating: state.isCurrentlyCreating,
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
        {occurrencesList.map((x) => (
          <ListItem>
            <ListItemButton>
              <ListItemText>Monday 3rd September</ListItemText>
              <ListItemText sx={{ textAlign: "end" }}>30 mins</ListItemText>
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
