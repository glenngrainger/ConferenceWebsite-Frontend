import create from "zustand";

interface OrganisationState {
  selectedOrganisationId: number | undefined;
  setSelectedOrganisationId: (organisationId: number | undefined) => void;
}

const useOrganisationStore = create<OrganisationState>((set) => ({
  selectedOrganisationId: undefined,
  setSelectedOrganisationId: (organisationId) =>
    set(() => ({ selectedOrganisationId: organisationId })),
}));

export default useOrganisationStore;
