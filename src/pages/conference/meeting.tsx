import { Box } from "@mui/material";
import Tabs from "../../components/tabs/tabs";
import useMeeting from "../../hooks/useMeeting";

const tabs = ["Conference", "Details"];

const Meeting = () => {
  const meeting = useMeeting();
  return (
    <Box sx={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}>
      <Box sx={{ width: "100%", height: "calc(100vh - 56px)" }}>
        {/* <iframe
          style={{ width: "100%", height: "100%" }}
          src={meeting.meeting.data?.embeddedUrl}
          allow="camera; microphone; fullscreen; speaker; display-capture; autoplay"
        ></iframe> */}
      </Box>
      {meeting.meeting?.data?.displayName}
      <Tabs
        tabOptions={tabs}
        selectedTab="Conference"
        tabChangedCallback={() => {}}
      />
    </Box>
  );
};

export default Meeting;
