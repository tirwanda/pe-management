// Material Dashboard 2 PRO React layouts
import ProfileOverview from "layouts/pages/profile/profile-overview";
import Settings from "layouts/pages/account/settings";
import SignInBasic from "layouts/authentication/sign-in/basic";

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
    collapse: [],
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
    name: "Report",
    key: "report",
    icon: <Icon fontSize="medium">summarize</Icon>,
    collapse: [],
  },
  {
    type: "collapse",
    name: "Assets",
    key: "assets",
    icon: <Icon fontSize="medium">precision_manufacturing</Icon>,
    collapse: [],
  },
];

export default routes;
