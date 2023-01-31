import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import shallow from "zustand/shallow";
import useConference from "../../../hooks/useConference";
import useOrganisation from "../../../hooks/useOrganisation";
import Conference from "../../../models/Conference";
import { ReturnErrorProps } from "../../../pages/plan/hooks/useErrors";
import useForm from "../../../pages/plan/hooks/useForm";
import useConferenceModalStore from "./useConferenceModalStore";

export type AddConferenceHandle = {
  addConference: () => void;
};

type Props = {
  initialValues: any;
};

const ConferenceDetailsForm = forwardRef<AddConferenceHandle, Props>(
  ({ initialValues }, ref) => {
    useImperativeHandle(ref, () => ({
      async addConference() {
        await addConference();
      },
    }));

    const { values, updateValues, clearValues, setAll } = useForm<{}>(
      initialValues
    );
    const { isCurrentlyCreating, setConference } = useConferenceModalStore(
      (state) => ({
        isCurrentlyCreating: state.isCurrentlyCreating,
        setConference: state.setConference,
      }),
      shallow
    );
    const { addConferenceMutation, addValidationErrors } = useConference();
    const { getCurrentSelectedOrganisation } = useOrganisation();
    const currentOrganisation = getCurrentSelectedOrganisation();

    const addConference = async () => {
      let result = undefined;
      if (currentOrganisation !== undefined) {
        const data = {
          ...values,
          organisationId: currentOrganisation?.id,
        } as Conference;
        result = await addConferenceMutation.mutateAsync(data);
      }
      if (result !== undefined) {
        setConference(result);
      }
      if (isCurrentlyCreating && result !== undefined) {
        setAll(result);
      }
    };
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
        {isCurrentlyCreating && (
          <Typography variant="body1">
            Conference will be added to {currentOrganisation?.name}. Conferences
            can be scheduled after adding details
          </Typography>
        )}
      </Box>
    );
  }
);

export default ConferenceDetailsForm;
