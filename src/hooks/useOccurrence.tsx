import { useMutation, useQuery, useQueryClient } from "react-query";
import shallow from "zustand/shallow";
import { addOccurrenceCall, getOccurrencesCall } from "../API/frontendCalls";
import useConferenceModalStore from "../components/modal/conference/useConferenceModalStore";
import useErrors from "../pages/plan/hooks/useErrors";

const useOccurrence = () => {
  const queryClient = useQueryClient();
  const validationErrors = useErrors();

  const selectedConference = useConferenceModalStore(
    (state) => state.conference,
    shallow
  );

  const occurrences = useQuery(
    ["Occurrences", { conferenceId: selectedConference?.id }],
    async () =>
      selectedConference?.id ? getOccurrencesCall(selectedConference?.id) : []
  );

  const addOccurrenceMutation = useMutation({
    mutationFn: async (data: object) => addOccurrenceCall(data),
    onError: async (error: any) => {
      validationErrors.updateErrors(error);
    },
    onSuccess: async (newOccurrence) => {
      queryClient.setQueryData(
        ["Occurrences", { conferenceId: selectedConference?.id }],
        (prev: any) => (prev ? [...prev, newOccurrence] : [newOccurrence])
      );
      validationErrors.clearErrors();
    },
  });

  return { occurrences, addOccurrenceMutation, validationErrors } as const;
};

export default useOccurrence;
