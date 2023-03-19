import React, {
  SyntheticEvent,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, MenuItem } from "@mui/material";
import useOrganisation from "../../../hooks/useOrganisation";
import { ReturnErrorProps } from "../../../pages/plan/hooks/useErrors";
import useForm from "../../../pages/plan/hooks/useForm";

export interface UpdateOrganisationModalHandle {
  openModal: () => void;
  closeModal: () => void;
}

const UpdateOrganisationModal = forwardRef<UpdateOrganisationModalHandle>(
  (props, ref) => {
    const {
      updateOrganisationMutation,
      updateValidationErrors,
      getCurrentSelectedOrganisation,
    } = useOrganisation();
    const { values, updateValues, clearValues, setAll } = useForm<{}>();
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      openModal() {
        handleClickOpen();
      },
      closeModal() {
        handleClose();
      },
    }));

    const handleClickOpen = () => {
      const organisation = getCurrentSelectedOrganisation();
      if (organisation === undefined) return;
      setAll(organisation);
      setOpen(true);
    };

    const handleClose = () => {
      clearValues();
      updateValidationErrors.clearErrors();
      setOpen(false);
    };

    const updateOrganisationHandler = async (e: SyntheticEvent) => {
      e.preventDefault();
      await updateOrganisationMutation.mutateAsync(values);
      handleClose();
    };

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Organisation</DialogTitle>
        <DialogContent>
          <Box component="form">
            <TextField
              value={values["name"] || ""}
              autoFocus
              margin="dense"
              id="name"
              label="Organisation name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => updateValues("name", e.target.value)}
              {...ReturnErrorProps(
                "Name",
                updateValidationErrors.validationErrors
              )}
            />
            <TextField
              value={values["summary"] || ""}
              margin="dense"
              id="standard-multiline-static"
              label="Organisation summary"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="standard"
              onChange={(e) => updateValues("summary", e.target.value)}
              {...ReturnErrorProps(
                "Summary",
                updateValidationErrors.validationErrors
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateOrganisationHandler}>Update</Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default UpdateOrganisationModal;
