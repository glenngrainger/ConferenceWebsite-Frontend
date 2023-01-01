import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addOrganisationCall,
  getOrganisationsCall,
} from "../../../API/frontendCalls";
import useErrors from "../hooks/useErrors";

const useOrganisationSection = () => {
  const queryClient = useQueryClient();
  const addValidationErrors = useErrors();

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

  return {
    organisations,
    addOrganisationMutation,
    addValidationErrors,
  } as const;
};

export default useOrganisationSection;
