// Material Dashboard 2 PRO React layouts
import Analytics from "layouts/dashboards/analytics";
import HistoryMachine from "layouts/dashboards/history-machine";
import ProfileOverview from "layouts/pages/profile/profile-overview";
import Settings from "layouts/pages/account/settings";
import SignInBasic from "layouts/authentication/sign-in/basic";
import NewLine from "layouts/dashboards/create-new-line";

// Material Dashboard 2 PRO React components
import MDAvatar from "components/MDAvatar";

// @mui icons
import Icon from "@mui/material/Icon";

// Images
import profilePicture from "assets/images/peae5.jpg";

const routes = [
  {
    type: "collapse",
    name: "PEAE5",
    key: "PEAE5",
    icon: <MDAvatar src={profilePicture} alt="PEAE5" size="sm" />,
    collapse: [
      {
        name: "My Profile",
        key: "my-profile",
        route: "/pages/profile/profile-overview",
        component: <ProfileOverview />,
      },
      {
        name: "Settings",
        key: "profile-settings",
        route: "/pages/account/settings",
        component: <Settings />,
      },
      {
        name: "Logout",
        key: "logout",
        route: "/sign-in",
        component: <SignInBasic />,
      },
    ],
  },
  { type: "divider", key: "divider-0" },
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    collapse: [
      {
        name: "Analytics",
        key: "analytics",
        route: "/dashboards/analytics",
        component: <Analytics />,
      },
      {
        name: "History Machine",
        key: "History Machine",
        route: "/dashboards/history-machine",
        component: <HistoryMachine />,
      },
      {
        name: "Create New Line",
        key: "create-new-line",
        route: `/assets/create-new-line`,
        component: <NewLine />,
      },
    ],
  },
  { type: "title", title: "Pages", key: "title-pages" },
  {
    type: "collapse",
    name: "Applications",
    key: "applications",
    icon: <Icon fontSize="medium">apps</Icon>,
    collapse: [],
  },
  {
    type: "collapse",
    name: "Assets",
    key: "assets",
    icon: <Icon fontSize="medium">shopping_basket</Icon>,
    collapse: [],
  },
];

export default routes;
