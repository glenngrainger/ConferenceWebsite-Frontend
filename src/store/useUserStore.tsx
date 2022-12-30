import { Session } from "@auth0/nextjs-auth0";
import create from "zustand";

interface User {
  session: Session | undefined;
  accessToken: string;
  setAccessToken: (token: string) => void;
  setSession: (session: Session) => void;
}

const useUserStore = create<User>((set) => ({
  session: undefined,
  accessToken: "",
  setAccessToken: (token: string) => set(() => ({ accessToken: token })),
  setSession: (session) => set((state) => ({ ...state, session: session })),
}));

export default useUserStore;
