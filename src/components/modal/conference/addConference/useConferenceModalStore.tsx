import create from "zustand";

interface ConferenceModalState {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  triggerCreateRequest: () => void;
  createRequestFinished: () => void;
  isCreateRequest: boolean;
}

const useConferenceModalStore = create<ConferenceModalState>((set) => ({
  isOpen: false,
  setIsOpen: (state) => set(() => ({ isOpen: state })),
  triggerCreateRequest: () => set(() => ({ isCreateRequest: true })),
  createRequestFinished: () => set(() => ({ isCreateRequest: false })),
  isCreateRequest: false,
}));

export default useConferenceModalStore;
