import { Session } from "@auth0/nextjs-auth0";
import create from "zustand";

interface User {
  session: Session | undefined;
  setSession: (session: Session) => void;
}

const useUserStore = create<User>((set) => ({
  session: undefined,
  setSession: (session) => set(() => ({ session: session })),
}));

export default useUserStore;
