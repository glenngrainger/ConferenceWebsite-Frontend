import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { BiDotsVerticalRounded } from "react-icons/bi";
import ConferenceModal from "../../../components/modal/conference/conferenceModal";
import { ConferenceModalStateProvider } from "../../../components/modal/conference/useConferenceModalStore";
import useConference from "../../../hooks/useConference";

const ConferenceSectionGrid = () => {
  const { conferences } = useConference();
  const conferencesList = conferences.data || [];
  return (
    <Grid container columns={{ xs: 2, sm: 4, md: 12 }} sx={{ mb: { xs: 8 } }}>
      {conferencesList.map((conference) => {
        const conferenceCount = conference.occurrenceCount || 0;
        const conferenceCountText = `${conferenceCount} Occurrence${
          conferenceCount > 1 ? "s" : ""
        }`;
        return (
          <Grid
            xs={2}
            sm={4}
            md={4}
            key={conference.id}
            sx={{
              px: 2,
              pb: 2,
            }}
          >
            <Card
              sx={{
                // minHeight: "250px",
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
                title={conference.name}
                subheader={conferenceCountText}
              />
              <CardContent sx={{ minHeight: "60px", maxHeight: "60px" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ overflowY: "auto" }}
                >
                  {conference.summary}
                </Typography>
              </CardContent>
              <ConferenceModalStateProvider>
                <ConferenceModal
                  modalClosedCallback={() => {}}
                  openType="grid"
                  initialConference={conference}
                  isInitialCreate={false}
                />
              </ConferenceModalStateProvider>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ConferenceSectionGrid;
