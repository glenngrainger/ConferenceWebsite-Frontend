import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Alert,
} from "@mui/material";
import { useState, forwardRef, useImperativeHandle } from "react";

interface Props {
  resourceType: string;
  extraDetails?: React.ReactNode;
  confirmCallback: () => void;
}

export interface DeleteModalHandle {
  closeModal: () => void;
  showModal: () => void;
}

const DeleteOrganisationModal = forwardRef<DeleteModalHandle, Props>(
  ({ resourceType, extraDetails, confirmCallback }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      closeModal() {
        closeModal();
      },
      showModal() {
        showModal();
      },
    }));

    const closeModal = function () {
      setIsOpen(false);
    };

    const showModal = function () {
      setIsOpen(true);
    };

    const deleteClickedHandler = function () {
      confirmCallback();
      closeModal();
    };

    return (
      <Dialog open={isOpen} onClose={closeModal}>
        <DialogTitle>Delete {resourceType}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the {resourceType}?
          </DialogContentText>
          <Alert sx={{ mt: 3 }} severity="error">
            {extraDetails ? (
              <>
                {extraDetails}
                <br />
              </>
            ) : (
              <></>
            )}
            This action cannot be undone
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button color="error" onClick={deleteClickedHandler}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

export default DeleteOrganisationModal;
