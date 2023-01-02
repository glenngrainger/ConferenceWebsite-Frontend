import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addOrganisationCall,
  deleteOrganisationCall,
  getOrganisationsCall,
  updateOrganisationCall,
} from "../../../API/frontendCalls";
import Organisation from "../../../models/Organisation";
import useErrors from "../hooks/useErrors";
import useOrganisationStore from "../store/useOrganisationStore";
import { useSnackbar } from "notistack";
import shallow from "zustand/shallow";

const useOrganisationSection = () => {
  const queryClient = useQueryClient();
  const addValidationErrors = useErrors();
  const updateValidationErrors = useErrors();
  const deleteValidationErrors = useErrors();
  const { selectedOrganisationId, setSelectedOrganisationId } =
    useOrganisationStore(
      (state) => ({
        selectedOrganisationId: state.selectedOrganisationId,
        setSelectedOrganisationId: state.setSelectedOrganisationId,
      }),
      shallow
    );
  const { enqueueSnackbar } = useSnackbar();

  const organisations = useQuery(["Organisations"], async () =>
    getOrganisationsCall()
  );

  const addOrganisationMutation = useMutation({
    mutationFn: async (data: object) => addOrganisationCall(data),
    onError: async (error: any) => {
      addValidationErrors.updateErrors(error);
    },
    onSuccess: async (newOrganisation) => {
      queryClient.setQueryData("Organisations", (prev: any) =>
        prev ? [...prev, newOrganisation] : [newOrganisation]
      );
      addValidationErrors.clearErrors();
    },
  });

  const updateOrganisationMutation = useMutation({
    mutationFn: async (data: any) => updateOrganisationCall(data?.id, data),
    onError: async (error: any) => {
      updateValidationErrors.updateErrors(error);
    },
    onSuccess: async (updatedOrganisation) => {
      queryClient.setQueryData("Organisations", (prev: any) =>
        prev
          ? [
              ...prev.filter(
                (x: Organisation) => x.id !== updatedOrganisation.id
              ),
              updatedOrganisation,
            ]
          : [updatedOrganisation]
      );
      updateValidationErrors.clearErrors();
    },
  });

  const deleteOrganisationMutation = useMutation({
    mutationFn: async (organisationId: string) =>
      deleteOrganisationCall(organisationId),
    onError: async (error: any) => {
      deleteValidationErrors.updateErrors(error);
    },
    onSuccess: async (organisationId) => {
      queryClient.setQueryData(
        "Organisations",
        (prev: any) =>
          prev && [...prev.filter((x: Organisation) => x.id !== organisationId)]
      );
      setSelectedOrganisationId(undefined);
      deleteValidationErrors.clearErrors();
    },
  });

  function getCurrentSelectedOrganisation() {
    let organisation = getOrganisationById(selectedOrganisationId || "");

    // Try and refetch if not found
    if (organisation === undefined) {
      queryClient.invalidateQueries("Organisations");
      organisation = getOrganisationById(selectedOrganisationId || "");
    }

    if (organisation === undefined) {
      enqueueSnackbar("Organisation not found", { variant: "error" });
      return;
    }

    return organisation;
  }

  function getOrganisationById(id: string) {
    return queryClient
      .getQueryData<Organisation[]>("Organisations")
      ?.find((x) => x.id === id);
  }

  return {
    organisations,
    addOrganisationMutation,
    addValidationErrors,
    updateValidationErrors,
    updateOrganisationMutation,
    deleteOrganisationMutation,
    deleteValidationErrors,
    getCurrentSelectedOrganisation,
  } as const;
};

export default useOrganisationSection;
