import { Box, TextField, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import shallow from "zustand/shallow";
import useConference from "../../../../hooks/useConference";
import useOrganisation from "../../../../hooks/useOrganisation";
import Conference from "../../../../models/Conference";
import { ReturnErrorProps } from "../../../../pages/plan/hooks/useErrors";
import useForm from "../../../../pages/plan/hooks/useForm";
import useConferenceModalStore from "./useConferenceModalStore";

const ConferenceDetailsForm = () => {
  const { values, updateValues, clearValues } = useForm<{}>();
  const { isAPIRequestInProgress, setAPIRequestFinished } =
    useConferenceModalStore(
      (state) => ({
        isAPIRequestInProgress: state.isAPIRequestInProgress,
        setAPIRequestFinished: state.setAPIRequestFinished,
      }),
      shallow
    );
  const { addConferenceMutation, addValidationErrors } = useConference();
  const { getCurrentSelectedOrganisation } = useOrganisation();
  const currentOrganisation = getCurrentSelectedOrganisation();

  const addConference = useCallback(async () => {
    let result = undefined;
    if (currentOrganisation !== undefined) {
      const data = {
        ...values,
        organisationId: currentOrganisation?.id,
      } as Conference;
      result = await addConferenceMutation.mutateAsync(data);
    }
    setAPIRequestFinished(result);
  }, [currentOrganisation, values]);

  useEffect(() => {
    if (isAPIRequestInProgress) {
      addConference();
    }
  }, [isAPIRequestInProgress]);

  return (
    <Box component="form" sx={{ p: 2 }}>
      <TextField
        value={values["name"] || ""}
        autoFocus
        margin="dense"
        id="name"
        label="Name"
        type="text"
        fullWidth
        variant="standard"
        onChange={(e) => updateValues("name", e.target.value)}
        {...ReturnErrorProps("Name", addValidationErrors.validationErrors)}
      />
      <TextField
        value={values["summary"] || ""}
        margin="dense"
        id="standard-multiline-static"
        label="Summary"
        type="text"
        fullWidth
        multiline
        rows={4}
        variant="standard"
        onChange={(e) => updateValues("summary", e.target.value)}
        {...ReturnErrorProps("Summary", addValidationErrors.validationErrors)}
      />
      <Typography variant="body1" sx={{}}>
        Conference will be added to {currentOrganisation?.name}. Conferences can
        be scheduled after adding details
      </Typography>
    </Box>
  );
};

export default ConferenceDetailsForm;
