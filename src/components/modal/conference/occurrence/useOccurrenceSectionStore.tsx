import create, { StoreApi } from "zustand";
import createContext from "zustand/context";
import { Occurrence } from "../../../../models/Occurrence";

export interface OccurrenceSectionState {
  isCurrentlyCreating: boolean;
  setIsCurrentlyCreating: (state: boolean) => void;
  occurrence: Occurrence | undefined;
  setOccurrence: (conference: Occurrence) => void;
  currentView: "list" | "form";
  setCurrentView: (view: "list" | "form") => void;
}

const { Provider, useStore } =
  createContext<StoreApi<OccurrenceSectionState>>();

const createStore = () =>
  create<OccurrenceSectionState>((set) => ({
    isCurrentlyCreating: false,
    setIsCurrentlyCreating: (state) =>
      set((prev) => ({
        isCurrentlyCreating: state,
        currentView: state ? "form" : prev.currentView,
        occurrence: undefined,
      })),
    occurrence: undefined,
    setOccurrence: (occurrence) =>
      set(() => ({
        occurrence: occurrence,
        isCurrentlyCreating: false,
        currentView: "form",
      })),
    currentView: "list",
    setCurrentView: (view) => set(() => ({ currentView: view })),
  }));

export const OccurrenceSectionStateProvider = ({
  children,
}: {
  children: any;
}) => {
  return <Provider createStore={createStore}>{children}</Provider>;
};

export default useStore;
