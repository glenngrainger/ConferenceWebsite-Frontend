import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Menu, MenuItem } from "@mui/material";
import useNavigation from "./useNavigation";

interface Props {
  isLoggedIn: boolean;
}

const Navigation = ({ isLoggedIn }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <MobileNav isLoggedIn={isLoggedIn} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}
          >
            Conference
          </Typography>
          <DesktopNav isLoggedIn={isLoggedIn} />
          {isLoggedIn ? (
            <Button color="warning" variant="contained" href="/api/auth/logout">
              Logout
            </Button>
          ) : (
            <Button color="inherit" href="/api/auth/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const DesktopNav = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { pages } = useNavigation();
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) =>
        page.mustBeLoggedIn && !isLoggedIn ? (
          <></>
        ) : (
          <Button
            key={page.name}
            onClick={() => {}}
            sx={{ my: 2, color: "white", display: "block", fontWeight: 600 }}
            href={page.url}
          >
            {page.name}
          </Button>
        )
      )}
    </Box>
  );
};

const MobileNav = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { handleCloseNavMenu, anchorElNav, handleOpenNavMenu, pages } =
    useNavigation();
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <div>IconMobile</div>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {pages.map((page) =>
          page.mustBeLoggedIn && !isLoggedIn ? (
            <></>
          ) : (
            <MenuItem
              key={page.name}
              onClick={handleCloseNavMenu}
              href={page.url}
            >
              <Typography textAlign="center">{page.name}</Typography>
            </MenuItem>
          )
        )}
      </Menu>
    </Box>
  );
};

export default Navigation;
