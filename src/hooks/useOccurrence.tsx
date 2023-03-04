import { useQuery } from "react-query";
import shallow from "zustand/shallow";
import { getOccurrencesCall } from "../API/frontendCalls";
import useConferenceModalStore from "../components/modal/conference/useConferenceModalStore";

const useOccurrence = () => {
  const selectedConference = useConferenceModalStore(
    (state) => state.conference,
    shallow
  );

  const occurrences = useQuery(
    ["Occurrences", { conferenceId: selectedConference?.id }],
    async () =>
      selectedConference?.id ? getOccurrencesCall(selectedConference?.id) : []
  );

  return { occurrences } as const;
};

export default useOccurrence;
