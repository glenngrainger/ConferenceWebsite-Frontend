import * as React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { AiOutlinePlus } from "react-icons/ai";
import { MenuItem } from "@mui/material";

const emails = ["username@gmail.com", "user02@gmail.com"];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function Modal(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Manage Admin Access</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem
            button
            onClick={() => handleListItemClick(email)}
            key={email}
          >
            <ListItemText primary={email} />
          </ListItem>
        ))}
        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addEmail")}
        >
          <ListItemAvatar>
            <Avatar>
              <AiOutlinePlus />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add email" />
        </ListItem>
      </List>
    </Dialog>
  );
}

const AdminAccessModal = ({
  modalClosedCallback,
}: {
  modalClosedCallback: () => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    modalClosedCallback();
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          handleClickOpen();
        }}
      >
        Admin Access
      </MenuItem>
      <Modal selectedValue={selectedValue} open={open} onClose={handleClose} />
    </>
  );
};

export default AdminAccessModal;
