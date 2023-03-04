import create, { StoreApi } from "zustand";
import createContext from "zustand/context";
import { Occurrence } from "../../../../models/Occurrence";

export interface OccurrenceSectionState {
  isCurrentlyCreating: boolean;
  setIsCurrentlyCreating: (state: boolean) => void;
  occurrence: Occurrence | undefined;
  setOccurrence: (conference: Occurrence) => void;
}

const { Provider, useStore } =
  createContext<StoreApi<OccurrenceSectionState>>();

const createStore = () =>
  create<OccurrenceSectionState>((set) => ({
    isCurrentlyCreating: false,
    setIsCurrentlyCreating: (state) =>
      set(() => ({ isCurrentlyCreating: state })),
    occurrence: undefined,
    setOccurrence: (occurrence) =>
      set(() => ({ occurrence: occurrence, isCurrentlyCreating: false })),
  }));

export const OccurrenceSectionStateProvider = ({
  children,
}: {
  children: any;
}) => {
  return <Provider createStore={createStore}>{children}</Provider>;
};

export default useStore;
