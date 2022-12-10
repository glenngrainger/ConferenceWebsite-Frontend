import create from "zustand";

interface Conference {
  id: number;
}

interface ConferenceState {
  conferences: Conference[];
}

const useConferenceStore = create<ConferenceState>((set) => ({
  conferences: [],
  fetch: async () => {
    const response = await fetch("");
    set({ conferences: await response.json() });
  },
}));

export default useConferenceStore;
