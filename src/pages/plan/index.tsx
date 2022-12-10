import shallow from "zustand/shallow";
import { Session } from "@auth0/nextjs-auth0";
import useUserStore from "../../store/useUserStore";
import ConferenceSection from "./conferenceSection";
import OrganisationSection from "./organisationSection";
import { useEffect } from "react";

const PlanPage = ({ session }: { session: Session }) => {
  const setSession = useUserStore((state) => state.setSession, shallow);
  useEffect(() => setSession(session), []);
  return (
    <>
      <OrganisationSection />
      <ConferenceSection />
    </>
  );
};

export default PlanPage;
