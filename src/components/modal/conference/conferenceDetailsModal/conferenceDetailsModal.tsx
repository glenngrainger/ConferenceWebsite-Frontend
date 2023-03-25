import { useState, forwardRef, useImperativeHandle } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import useMeeting from "../../../../hooks/useMeeting";
import { Meeting } from "../../../../models/Meeting";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import moment from "moment";

export interface ConferenceDetailsModalHandle {
  openModal: () => void;
  closeModal: () => void;
}

const ConferenceDetailsModal = forwardRef<ConferenceDetailsModalHandle>(
  (props, ref) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const { meeting } = useMeeting();
    const details = meeting.data as Meeting;

    useImperativeHandle(ref, () => ({
      openModal() {
        handleClickOpen();
      },
      closeModal() {
        handleClose();
      },
    }));

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ minWidth: "350px" }}>Conference Details</DialogTitle>
        <DialogContent>
          <Typography>Organisation</Typography>
          <Typography color="GrayText" sx={{ mb: 1 }}>
            {details?.organisation?.name}
          </Typography>
          <Typography>Conference</Typography>
          <Typography color="GrayText" sx={{ mb: 1 }}>
            {details?.conference?.name}
          </Typography>
          <Typography>Summary</Typography>
          <Typography color="GrayText" sx={{ mb: 1 }}>
            {details?.conference?.summary}
          </Typography>
          <Box
            sx={{
              mt: 4,
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.common.white,
              p: 2,
              borderRadius: 1,
            }}
          >
            <Typography>
              <>
                {moment
                  .utc(details?.dateTime, "YYYY-MM-DD HH:mm")
                  .local()
                  .format("dddd Do MMMM YYYY HH:mm")}
              </>
            </Typography>
            <Typography>
              <>{details?.duration} minutes</>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default ConferenceDetailsModal;
