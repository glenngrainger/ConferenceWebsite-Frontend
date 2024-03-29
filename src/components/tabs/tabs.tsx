import {
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
} from "@mui/material";

const Tabs = ({
  tabOptions,
  selectedTab,
  tabChangedCallback,
}: {
  tabOptions: string[];
  selectedTab: string;
  tabChangedCallback: (selectedTab: string) => void;
}) => {
  const theme = useTheme();

  return (
    <BottomNavigation
      showLabels
      value={selectedTab}
      onChange={(event, newValue) => {
        tabChangedCallback(newValue);
      }}
      sx={{
        mt: "auto",
        borderTop: `1px solid ${theme.palette.grey[300]}`,
      }}
    >
      {tabOptions.map((tab) => (
        <BottomNavigationAction key={tab} value={tab} label={tab} />
      ))}
    </BottomNavigation>
  );
};

export default Tabs;
