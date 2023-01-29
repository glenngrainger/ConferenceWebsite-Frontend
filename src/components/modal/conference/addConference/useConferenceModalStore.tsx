import create, { StoreApi } from "zustand";
import createContext from "zustand/context";

interface ConferenceModalState {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  triggerCreateRequest: () => void;
  createRequestFinished: () => void;
  isCreateRequest: boolean;
}

const { Provider, useStore } = createContext<StoreApi<ConferenceModalState>>();

const createStore = () =>
  create<ConferenceModalState>((set) => ({
    isOpen: false,
    setIsOpen: (state) => set(() => ({ isOpen: state })),
    triggerCreateRequest: () => set(() => ({ isCreateRequest: true })),
    createRequestFinished: () => set(() => ({ isCreateRequest: false })),
    isCreateRequest: false,
  }));

export const ConferenceModalStateProvider = ({
  children,
}: {
  children: any;
}) => {
  return <Provider createStore={createStore}>{children}</Provider>;
};

export default useStore;
