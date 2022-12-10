import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Grid from "@mui/material/Unstable_Grid2";
import { BiDotsVerticalRounded } from "react-icons/bi";

const ConferenceSectionGrid = () => {
  return (
    <Grid
      container
      //   spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 2, sm: 4, md: 12 }}
      sx={{ mb: { xs: 8 } }}
    >
      {Array.from(Array(6)).map((_, index) => (
        <Grid
          xs={2}
          sm={4}
          md={4}
          key={index}
          sx={{
            px: 2,
            pb: 2,
          }}
        >
          <Card
            sx={{
              minHeight: "250px",
              maxHeight: "250px",
            }}
            variant="outlined"
          >
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <BiDotsVerticalRounded />
                </IconButton>
              }
              title="Test Conference"
              subheader="3 Scheduled"
            />
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ overflowY: "auto", maxHeight: "75px" }}
              >
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button size="small">Schedule</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ConferenceSectionGrid;
