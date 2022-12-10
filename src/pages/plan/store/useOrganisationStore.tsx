import create from "zustand";

interface Organisation {
  id: number;
}

interface OrganisationState {
  organisations: Organisation[];
}

const useOrganisationStore = create<OrganisationState>((set) => ({
  organisations: [],
  fetch: async () => {
    const response = await fetch("");
    set({ organisations: await response.json() });
  },
}));

export default useOrganisationStore;
