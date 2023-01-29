import create, { StoreApi } from "zustand";
import createContext from "zustand/context";
import { subscribeWithSelector } from "zustand/middleware";
import { Errors } from "../../../../models/APIErrorModel";

interface ConferenceModalState {
  isInitialCreate: boolean;
  setIsInitialCreate: (state: boolean) => void;
  isCurrentlyCreating: boolean;
  setIsCurrentlyCreating: (state: boolean) => void;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setIsOpen: (state: boolean) => void;
  triggerCreateAPIRequest: () => void;
  createAPIRequestFinished: () => void;
  isCreateAPIRequestInProgress: boolean;
}

const { Provider, useStore } = createContext<StoreApi<ConferenceModalState>>();

const createStore = () =>
  create<ConferenceModalState>((set) => ({
    isInitialCreate: false,
    setIsInitialCreate: (state) =>
      set(() => ({ isInitialCreate: state, isCurrentlyCreating: true })),
    isCurrentlyCreating: false,
    setIsCurrentlyCreating: (state) =>
      set(() => ({ isCurrentlyCreating: state })),
    isOpen: false,
    openModal: () => set(() => ({ isOpen: true })),
    closeModal: () =>
      set((prev) => ({
        isOpen: false,
        isCurrentlyCreating: prev.isInitialCreate,
      })),
    setIsOpen: (state) => set(() => ({ isOpen: state })),
    triggerCreateAPIRequest: () =>
      set(() => ({ isCreateAPIRequestInProgress: true })),
    createAPIRequestFinished: () =>
      set(() => ({ isCreateAPIRequestInProgress: false })),
    isCreateAPIRequestInProgress: false,
  }));

export const ConferenceModalStateProvider = ({
  children,
}: {
  children: any;
}) => {
  return <Provider createStore={createStore}>{children}</Provider>;
};

export default useStore;
