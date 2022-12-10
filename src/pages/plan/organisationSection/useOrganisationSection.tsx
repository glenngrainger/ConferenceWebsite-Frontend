import { useQuery } from "react-query";

const useOrganisationSection = () => {
  const organisations = useQuery({
    queryKey: ["organisations"],
    queryFn: () => {
      return [];
    },
  });

  return { organisations } as const;
};

export default useOrganisationSection;
