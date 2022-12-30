import shallow from "zustand/shallow";
import { Session } from "@auth0/nextjs-auth0";
import useUserStore from "../../store/useUserStore";
import ConferenceSection from "./conferenceSection";
import OrganisationSection from "./organisationSection";
import { useEffect } from "react";
import useOrganisationStore from "./store/useOrganisationStore";
import EmptyTemplate from "./organisationSection/emptyTemplate";

const PlanPage = ({ session }: { session: Session }) => {
  const setSession = useUserStore((state) => state.setSession, shallow);
  const setAccessToken = useUserStore((state) => state.setAccessToken, shallow);
  const selectedOrganisationId = useOrganisationStore(
    (state) => state.selectedOrganisationId,
    shallow
  );
  useEffect(() => {
    // Temporary - need to figure out
    setSession(session);
    setAccessToken("");
  }, []);
  return (
    <>
      <OrganisationSection />
      {selectedOrganisationId !== undefined ? (
        <ConferenceSection />
      ) : (
        <EmptyTemplate />
      )}
    </>
  );
};

export default PlanPage;
