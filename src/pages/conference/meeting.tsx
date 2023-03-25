import { useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Tabs from "../../components/tabs/tabs";
import useMeeting from "../../hooks/useMeeting";
import ConferenceDetailsModal, {
  ConferenceDetailsModalHandle,
} from "../../components/modal/conference/conferenceDetailsModal/conferenceDetailsModal";
import moment from "moment";

const tabs = ["Conference", "Details"];

const Meeting = () => {
  const theme = useTheme();
  const conferenceDetailsModalRef = useRef<ConferenceDetailsModalHandle>(null);
  const { meeting } = useMeeting();

  const tabClickedHandler = function (tab: string) {
    if (tab === "Details") {
      conferenceDetailsModalRef?.current?.openModal();
    }
  };

  if (meeting?.data === undefined) {
    return <></>;
  }

  if (!meeting?.data?.hasStarted) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            p: 3,
            border: `3px solid ${theme.palette.primary.main}`,
            borderRadius: "6px",
          }}
        >
          <Typography>
            Conference starts{" "}
            {moment
              .utc(meeting?.data?.dateTime, "YYYY-MM-DD HH:mm")
              .local()
              .format("dddd Do MMMM YYYY HH:mm")}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}>
        <Box sx={{ width: "100%", height: "calc(100vh - 56px)" }}>
          <iframe
            style={{ width: "100%", height: "100%" }}
            src={meeting.data?.embeddedUrl}
            allow="camera; microphone; fullscreen; speaker; display-capture; autoplay"
          ></iframe>
        </Box>
        {meeting?.data?.displayName}
        <Tabs
          tabOptions={tabs}
          selectedTab="Conference"
          tabChangedCallback={tabClickedHandler}
        />
      </Box>
      <ConferenceDetailsModal ref={conferenceDetailsModalRef} />
    </>
  );
};

export default Meeting;
