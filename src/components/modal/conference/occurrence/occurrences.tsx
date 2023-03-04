import { Box, Button, Typography } from "@mui/material";
import NoItemSelected from "./noItemSelected";
import OccurrencesList from "./occurrencesList";
import OccurrenceForm from "./occurrenceForm";

const Occurrences = () => {
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
          borderLeft: { xs: 0, md: 1 },
          borderColor: "grey.300",
        }}
      >
        {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 500, color: "text.secondary" }}
          >
            Details
          </Typography>
          <Button color="error">Delete</Button>
        </Box>
        <OccurrenceForm /> */}
        <NoItemSelected />
      </Box>
    </Box>
  );
};

export default Occurrences;
