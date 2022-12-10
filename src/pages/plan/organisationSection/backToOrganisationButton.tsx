import { Button } from "@mui/material";
import { MdArrowBackIosNew } from "react-icons/md";
import usePlanStore, { ViewEnum } from "../store/usePlanStore";

const BackToOrganisationButton = () => {
  const setSelectedView = usePlanStore((state) => state.setSelectedView);
  return (
    <Button
      sx={{
        position: "fixed",
        bottom: 20,
        left: 20,
        display: { md: "none" },
      }}
      startIcon={<MdArrowBackIosNew />}
      color="secondary"
      variant="contained"
      onClick={() => setSelectedView(ViewEnum.Organisation)}
    >
      Back to Organisations
    </Button>
  );
};

export default BackToOrganisationButton;
