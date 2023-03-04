import create from "zustand";

interface OccurrenceState {
  selectedOccurrenceId: string | undefined;
  setSelectedOccurrenceId: (occurrenceId: string | undefined) => void;
}

const useOccurrenceStore = create<OccurrenceState>((set) => ({
  selectedOccurrenceId: undefined,
  setSelectedOccurrenceId: (occurrenceId) =>
    set(() => ({ selectedOccurrenceId: occurrenceId })),
}));

export default useOccurrenceStore;
