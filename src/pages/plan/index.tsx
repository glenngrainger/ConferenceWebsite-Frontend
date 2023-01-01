import shallow from "zustand/shallow";
import ConferenceSection from "./conferenceSection";
import OrganisationSection from "./organisationSection";
import useOrganisationStore from "./store/useOrganisationStore";
import EmptyTemplate from "./organisationSection/emptyTemplate";

const PlanPage = () => {
  const selectedOrganisationId = useOrganisationStore(
    (state) => state.selectedOrganisationId,
    shallow
  );
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
