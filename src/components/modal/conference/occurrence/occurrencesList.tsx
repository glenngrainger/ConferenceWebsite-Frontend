import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const OccurrencesList = () => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2 }}>
        <Button>Create</Button>
      </Box>
      <List sx={{ overflow: "auto", height: "calc(100% - 36px)" }}>
        {[1, 2, 3, 4, 5, 6, 7].map((x) => (
          <ListItem>
            <ListItemButton selected={x === 1}>
              <ListItemText>Monday 3rd September</ListItemText>
              <ListItemText sx={{ textAlign: "end" }}>30 mins</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OccurrencesList;
