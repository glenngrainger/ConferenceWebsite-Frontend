import useErrors from "../pages/plan/hooks/useErrors";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSnackbar } from "notistack";
import shallow from "zustand/shallow";
import {
  addConferenceCall,
  getConferencesCall,
  updateConferenceCall,
} from "../API/frontendCalls";
import useOrganisationStore from "../pages/plan/store/useOrganisationStore";
import Conference from "../models/Conference";

const useConference = () => {
  const queryClient = useQueryClient();
  const validationErrors = useErrors();
  const selectedOrganisationId = useOrganisationStore(
    (state) => state.selectedOrganisationId,
    shallow
  );

  const { enqueueSnackbar } = useSnackbar();

  const conferences = useQuery(
    ["Conferences", { organisationId: selectedOrganisationId }],
    async () =>
      selectedOrganisationId ? getConferencesCall(selectedOrganisationId) : []
  );

  const addConferenceMutation = useMutation({
    mutationFn: async (data: object) => addConferenceCall(data),
    onError: async (error: any) => {
      validationErrors.updateErrors(error);
    },
    onSuccess: async (newConference) => {
      queryClient.setQueryData(
        ["Conferences", { organisationId: selectedOrganisationId }],
        (prev: any) => (prev ? [...prev, newConference] : [newConference])
      );
      validationErrors.clearErrors();
    },
  });

  const updateConferenceMutation = useMutation({
    mutationFn: async (data: any) => updateConferenceCall(data?.id, data),
    onError: async (error: any) => {
      validationErrors.updateErrors(error);
    },
    onSuccess: async (updatedConference) => {
      queryClient.setQueryData(
        ["Conferences", { organisationId: selectedOrganisationId }],
        (prev: any) =>
          prev
            ? [
                ...prev.filter(
                  (x: Conference) => x.id !== updatedConference.id
                ),
                updatedConference,
              ]
            : [updatedConference]
      );
      validationErrors.clearErrors();
    },
  });

  return {
    conferences,
    validationErrors,
    addConferenceMutation,
    updateConferenceMutation,
  } as const;
};

export default useConference;
