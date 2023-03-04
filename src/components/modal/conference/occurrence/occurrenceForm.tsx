import { Box, Link, TextField, Typography } from "@mui/material";

const OccurrenceForm = () => {
  return (
    <Box component="form">
      <TextField
        // value={values["name"] || ""}
        autoFocus
        margin="dense"
        id="name"
        // label="Date"
        type="date"
        fullWidth
        variant="standard"
        // onChange={(e) => updateValues("name", e.target.value)}
        // {...ReturnErrorProps("Name", validationErrors.validationErrors)}
      />
      <TextField
        // value={values["summary"] || ""}
        margin="dense"
        id="filled-number"
        label="Duration"
        type="number"
        fullWidth
        variant="standard"
        // onChange={(e) => updateValues("summary", e.target.value)}
        // {...ReturnErrorProps("Summary", validationErrors.validationErrors)}
      />
      <Typography variant="body1" sx={{ my: 2 }}>
        Admin Url
      </Typography>
      <Link sx={{ cursor: "pointer" }}>Test Admin Url</Link>
      <Typography variant="body1" sx={{ my: 2 }}>
        Standard Url
      </Typography>
      <Link sx={{ cursor: "pointer" }}>Test Standard Url</Link>
    </Box>
  );
};

export default OccurrenceForm;
