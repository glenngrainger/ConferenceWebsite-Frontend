import create from "zustand";

interface OrganisationState {
  selectedOrganisationId: string | undefined;
  setSelectedOrganisationId: (organisationId: string | undefined) => void;
}

const useOrganisationStore = create<OrganisationState>((set) => ({
  selectedOrganisationId: undefined,
  setSelectedOrganisationId: (organisationId) =>
    set(() => ({ selectedOrganisationId: organisationId })),
}));

export default useOrganisationStore;
