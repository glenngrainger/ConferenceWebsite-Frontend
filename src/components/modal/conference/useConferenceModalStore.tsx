import create, { Mutate, StoreApi } from "zustand";
import createContext from "zustand/context";
import { subscribeWithSelector } from "zustand/middleware";
import { Errors } from "../../../models/APIErrorModel";
import Conference from "../../../models/Conference";

export interface ConferenceModalState {
  isInitialCreate: boolean;
  setIsInitialCreate: (state: boolean) => void;
  selectedNavTab: "Details" | "Scheduled" | "Documents";
  setSelectedNavTab: (tab: "Details" | "Scheduled" | "Documents") => void;
  isCurrentlyCreating: boolean;
  setIsCurrentlyCreating: (state: boolean) => void;
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setIsOpen: (state: boolean) => void;
  triggerAPIRequest: () => void;
  setAPIRequestFinished: (conference: Conference | undefined) => void;
  isAPIRequestInProgress: boolean;
  conference: Conference | undefined;
  setConference: (conference: Conference) => void;
}

const { Provider, useStore } = createContext<StoreApi<ConferenceModalState>>();

const createStore = () =>
  create<ConferenceModalState>((set) => ({
    isInitialCreate: false,
    setIsInitialCreate: (state) =>
      set(() => ({ isInitialCreate: state, isCurrentlyCreating: state })),
    selectedNavTab: "Details",
    setSelectedNavTab: (tab) => set(() => ({ selectedNavTab: tab })),
    isCurrentlyCreating: false,
    setIsCurrentlyCreating: (state) =>
      set(() => ({ isCurrentlyCreating: state })),
    isOpen: false,
    openModal: () => set(() => ({ isOpen: true })),
    closeModal: () =>
      set((prev) => ({
        isOpen: false,
        isCurrentlyCreating: prev.isInitialCreate,
        conference: undefined,
        selectedNavTab: "Details",
      })),
    setIsOpen: (state) => set(() => ({ isOpen: state })),
    triggerAPIRequest: () => set(() => ({ isAPIRequestInProgress: true })),
    setAPIRequestFinished: (result) =>
      set((prev) => ({
        isCreateAPIRequestInProgress: false,
        isCurrentlyCreating:
          prev.isCurrentlyCreating && result !== undefined
            ? false
            : prev.isCurrentlyCreating,
        conference: result !== undefined ? result : prev.conference,
      })),
    isAPIRequestInProgress: false,
    conference: undefined,
    setConference: (conference) => set(() => ({ conference })),
  }));

export const ConferenceModalStateProvider = ({
  children,
}: {
  children: any;
}) => {
  return <Provider createStore={createStore}>{children}</Provider>;
};

export default useStore;
