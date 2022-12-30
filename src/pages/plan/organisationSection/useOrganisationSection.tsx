import { useMutation, useQuery, useQueryClient } from "react-query";
import { APIGet, APIPost } from "../../../API/API";
import { getOrganisationCall, addOrganisationCall } from "../../../API/calls";
import Organisation from "../../../models/Organisation";
import useUserStore from "../../../store/useUserStore";

const useOrganisationSection = () => {
  const queryClient = useQueryClient();
  const accessToken = useUserStore((state) => state.accessToken);

  const organisations = useQuery(["Organisations"], async () =>
    getOrganisationCall(accessToken)
  );

  const addOrganisationMutation = useMutation({
    mutationFn: async (data: object) => addOrganisationCall(data, accessToken),
    onError: async () => {
      console.log("error");
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
