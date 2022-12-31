import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addOrganisationCall,
  getOrganisationCall,
} from "../../../API/frontendCalls";

const useOrganisationSection = () => {
  const queryClient = useQueryClient();
  const [validationErrors, setValidationErrors] = useState({});

  const organisations = useQuery(["Organisations"], async () =>
    getOrganisationCall()
  );

  const addOrganisationMutation = useMutation({
    mutationFn: async (data: object) => addOrganisationCall(data),
    onError: async (error: any) => {
      const validationErrors = error?.response?.data?.errors;
      if (validationErrors !== undefined) {
      }
      // Maybe create a error response model?
    },
    onSuccess: async (newOrganisation) => {
      queryClient.setQueryData("Organisations", (prev: any) =>
        prev ? [...prev, newOrganisation] : [newOrganisation]
      );
    },
  });

  return { organisations, addOrganisationMutation } as const;
};

export default useOrganisationSection;
