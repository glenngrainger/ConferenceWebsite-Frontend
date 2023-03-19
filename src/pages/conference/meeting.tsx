import { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import Tabs from "../../components/tabs/tabs";
import useMeeting from "../../hooks/useMeeting";
import ConferenceDetailsModal, {
  ConferenceDetailsModalHandle,
} from "../../components/modal/conference/conferenceDetailsModal/conferenceDetailsModal";

const tabs = ["Conference", "Details"];

const Meeting = () => {
  const conferenceDetailsModalRef = useRef<ConferenceDetailsModalHandle>(null);
  const { meeting } = useMeeting();

  const tabClickedHandler = function (tab: string) {
    if (tab === "Details") {
      conferenceDetailsModalRef?.current?.openModal();
    }
  };

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
