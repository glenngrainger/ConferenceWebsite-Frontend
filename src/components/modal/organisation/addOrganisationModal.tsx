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
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import useOrganisation from "../../../hooks/useOrganisation";
import { ReturnErrorProps } from "../../../pages/plan/hooks/useErrors";
import useForm from "../../../pages/plan/hooks/useForm";

export interface AddOrganisationModalHandle {
  openModal: () => void;
  closeModal: () => void;
}

const AddOrganisationModal = forwardRef<AddOrganisationModalHandle>(
  (props, ref) => {
    const { addOrganisationMutation, addValidationErrors } = useOrganisation();
    const { values, updateValues, clearValues } = useForm<{}>();
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
      setOpen(true);
    };

    const handleClose = () => {
      clearValues();
      addValidationErrors.clearErrors();
      setOpen(false);
    };

    const addOrganisationHandler = async (e: SyntheticEvent) => {
      e.preventDefault();
      await addOrganisationMutation.mutateAsync(values);
      handleClose();
    };

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Organisation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will be added as an admin to the organisation. Other user access
            can be added once created
          </DialogContentText>
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
                addValidationErrors.validationErrors
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
                addValidationErrors.validationErrors
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addOrganisationHandler}>Create</Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default AddOrganisationModal;
