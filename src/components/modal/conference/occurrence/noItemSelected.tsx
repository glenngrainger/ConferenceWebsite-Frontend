import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const NoItemSelected = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.grey[200],
      }}
    >
      <Typography variant="subtitle1">No occurrence selected</Typography>
    </Box>
  );
};

export default NoItemSelected;
