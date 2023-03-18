import { useState } from "react";

interface Page {
  name: string;
  url: string;
  mustBeLoggedIn: boolean;
}
const pages: Page[] = [
  { name: "Plan", mustBeLoggedIn: true, url: "/plan" },
  // {name: 'Browse', mustBeLoggedIn: true},
  // {name: 'Upcoming', mustBeLoggedIn: true},
];

const useNavigation = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return {
    anchorElNav,
    anchorElUser,
    handleOpenNavMenu,
    handleOpenUserMenu,
    handleCloseNavMenu,
    handleCloseUserMenu,
    pages,
  } as const;
};

export default useNavigation;
