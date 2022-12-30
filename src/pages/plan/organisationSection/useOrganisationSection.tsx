import { useQuery } from "react-query";
import { APIGet } from "../../../API/API";
import useUserStore from "../../../store/useUserStore";

const useOrganisationSection = () => {
  const accessToken = useUserStore((state) => state.accessToken);

  const organisations = useQuery(
    ["Organisations"],
    async () => await APIGet("Organisation", accessToken)
  );

  return { organisations } as const;
};

export default useOrganisationSection;
