import { useMutation, useQuery, useQueryClient } from "react-query";
import shallow from "zustand/shallow";
import {
  addOccurrenceCall,
  deleteOccurrenceCall,
  getOccurrencesCall,
} from "../API/frontendCalls";
import useOccurrenceSectionStore from "../components/modal/conference/occurrence/useOccurrenceSectionStore";
import useConferenceModalStore from "../components/modal/conference/useConferenceModalStore";
import { Occurrence } from "../models/Occurrence";
import useErrors from "../pages/plan/hooks/useErrors";

const useOccurrence = () => {
  const queryClient = useQueryClient();
  const validationErrors = useErrors();

  const selectedConference = useConferenceModalStore(
    (state) => state.conference,
    shallow
  );

  const { clearSelectedOccurrence } = useOccurrenceSectionStore((state) => ({
    clearSelectedOccurrence: state.clearSelectedOccurrence,
  }));

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

  const deleteOccurrenceMutation = useMutation({
    mutationFn: async (occurrenceId: string) =>
      deleteOccurrenceCall(occurrenceId),
    onError: async (error: any) => {
      validationErrors.updateErrors(error);
    },
    onSuccess: async (occurrenceId) => {
      queryClient.setQueryData(
        ["Occurrences", { conferenceId: selectedConference?.id }],
        (prev: any) =>
          prev && [...prev.filter((x: Occurrence) => x.id !== occurrenceId)]
      );
      clearSelectedOccurrence();
      validationErrors.clearErrors();
    },
  });

  return {
    occurrences,
    addOccurrenceMutation,
    deleteOccurrenceMutation,
    validationErrors,
  } as const;
};

export default useOccurrence;
