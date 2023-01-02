import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  TextField,
  Divider,
} from "@mui/material";
import { AiOutlinePlus, AiOutlineDown } from "react-icons/ai";
import AdminAccessModal from "../../../components/modal/adminAccessModal";
import DeleteOrganisationModal from "../../../components/modal/deleteOrganisationModal";
import UpdateOrganisationModal from "../../../components/modal/updateOrganisationModal";
import useMenu from "../hooks/useMenu";

const ConferenceSectionHeader = () => {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontSize: "24px" }}>
        21 Conferences
      </Typography>
      <Box sx={{ display: "flex", gap: "12px", ml: "auto" }}>
        {/* <Button>New Conference</Button> */}
        <ManageOrganisationMenu />
      </Box>
    </Box>
  );
};

const ManageOrganisationMenu = () => {
  const { open, anchorEl, handleClick, handleClose } = useMenu();
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        color="secondary"
        endIcon={<AiOutlineDown />}
      >
        Manage
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>New Conference</MenuItem>
        <Divider />
        <UpdateOrganisationModal modalClosedCallback={handleClose} />
        <DeleteOrganisationModal modalClosedCallback={handleClose} />
        <AdminAccessModal modalClosedCallback={handleClose} />
      </Menu>
    </>
  );
};

export default ConferenceSectionHeader;
