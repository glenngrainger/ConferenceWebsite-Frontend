import useErrors from "../pages/plan/hooks/useErrors";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSnackbar } from "notistack";
import shallow from "zustand/shallow";
import { addConferenceCall, getConferencesCall } from "../API/frontendCalls";
import useOrganisationStore from "../pages/plan/store/useOrganisationStore";

const useConference = () => {
  const queryClient = useQueryClient();
  const addValidationErrors = useErrors();
  const selectedOrganisationId = useOrganisationStore(
    (state) => state.selectedOrganisationId,
    shallow
  );

  const { enqueueSnackbar } = useSnackbar();

  const conferences = useQuery(["Conferences"], async () =>
    selectedOrganisationId ? getConferencesCall(selectedOrganisationId) : []
  );

  const addConferenceMutation = useMutation({
    mutationFn: async (data: object) => addConferenceCall(data),
    onError: async (error: any) => {
      addValidationErrors.updateErrors(error);
    },
    onSuccess: async (newConference) => {
      queryClient.setQueryData("Conferences", (prev: any) =>
        prev ? [...prev, newConference] : [newConference]
      );
      addValidationErrors.clearErrors();
    },
  });

  return { conferences, addConferenceMutation, addValidationErrors } as const;
};

export default useConference;
