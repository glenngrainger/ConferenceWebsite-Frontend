import create from "zustand";

export enum ViewEnum {
  Organisation,
  ConferenceHome,
}

interface PlanState {
  selectedView: ViewEnum;
  setSelectedView: (view: ViewEnum) => void;
}

const usePlanStore = create<PlanState>((set) => ({
  selectedView: ViewEnum.Organisation,
  setSelectedView: (view) => set(() => ({ selectedView: view })),
}));

export default usePlanStore;
