import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getMeetingCall } from "../API/frontendCalls";

const useMeeting = () => {
  const router = useRouter();
  const { occurrenceId } = router.query;
  const meeting = useQuery("Meeting", async () =>
    getMeetingCall(occurrenceId as string)
  );
  return { meeting } as const;
};

export default useMeeting;
