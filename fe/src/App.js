import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 PRO React themes
import theme from "assets/theme";

// Material Dashboard 2 PRO React Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 PRO React routes
import routes from "routes";

// Material Dashboard 2 PRO React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/xyz-brand-white.png";
import brandDark from "assets/images/xyz-brand-dark.png";

// Layouts Component
import SignInBasic from "layouts/authentication/sign-in/basic";
import RegisterStepper from "layouts/authentication/sign-up/Validate";
import NewAsset from "layouts/maintain/assets/new-asset";
import AssetPage from "layouts/maintain/assets/asset-page";
import EditAsset from "layouts/maintain/assets/edit-asset";
import DetailAsset from "layouts/maintain/assets/asset-detail";
import DetailCM from "layouts/applications/detail-cm";
import CreateCM from "layouts/applications/create-cm";
import Report from "layouts/report/mttr-mtbf";
import ListCM from "layouts/applications/list-cm";
import UpdateCM from "layouts/applications/update-cm";
import HistoryMachine from "layouts/dashboards/history-machine";
import NewLine from "layouts/dashboards/create-new-line";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const [render, setRender] = useState(false);
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [customRoutes, setCustomRoutes] = useState(routes);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  function getRoutesCustom() {
    const lineData = JSON.parse(localStorage.getItem("LINES"));
    const role = localStorage.getItem("ROLE");

    if (role === "ROLE_MANAGER" || role === "ROLE_ADMIN" || role === "ROLE_ENGINEER") {
      if (lineData) {
        return lineData?.map((line) => ({
          name: line.lineName,
          key: line.lineId,
          collapse: [
            {
              name: "New Asset",
              key: "new-asset",
              route: `/assets/${line.lineCode}/new-asset`,
              component: <NewAsset lineCode={line.lineCode} />,
            },
            {
              name: "Assets Page",
              key: "assets-page",
              route: `/assets/${line.lineCode}/assets-page`,
              component: <AssetPage title={line.lineName} lineCode={line.lineCode} />,
            },
          ],
        }));
      }
    }

    if (role === "ROLE_PRODUCTION") {
      if (lineData) {
        return lineData?.map((line) => ({
          name: line.lineName,
          key: line.lineId,
          collapse: [
            {
              name: "Assets Page",
              key: "assets-page",
              route: `/assets/${line.lineCode}/assets-page`,
              component: <AssetPage title={line.lineName} lineCode={line.lineCode} />,
            },
          ],
        }));
      }
    }
    return null;
  }

  function getDashboardRoutes() {
    const role = localStorage.getItem("ROLE");

    if (role === "ROLE_MANAGER" || role === "ROLE_ADMIN" || role === "ROLE_ENGINEER") {
      return [
        {
          name: "History Machine",
          key: "History Machine",
          route: "/dashboards/history-machine",
          component: <HistoryMachine />,
        },
        {
          name: "Create New Line",
          key: "create-new-line",
          route: `/dashboards/create-new-line`,
          component: <NewLine />,
        },
      ];
    }

    if (role === "ROLE_PRODUCTION") {
      return [
        {
          name: "History Machine",
          key: "History Machine",
          route: "/dashboards/history-machine",
          component: <HistoryMachine />,
        },
      ];
    }
    return null;
  }

  function getApplicationsRoutes() {
    const role = localStorage.getItem("ROLE");
    if (role === "ROLE_PRODUCTION" || role === "ROLE_ADMIN" || role === "ROLE_ENGINEER") {
      return [
        {
          type: "collapse",
          name: "Corrective MTC",
          key: "corrective",
          icon: <Icon fontSize="medium">receipt_long</Icon>,
          collapse: [
            {
              name: "Create CM",
              key: "create-cm",
              route: "/applications/form-cm",
              component: <CreateCM />,
            },
            {
              name: "List CM",
              key: "list-cm",
              route: "/applications/list-cm",
              component: <ListCM />,
            },
          ],
        },
      ];
    }

    if (role === "ROLE_MANAGER") {
      return [
        {
          type: "collapse",
          name: "Corrective MTC",
          key: "corrective",
          icon: <Icon fontSize="medium">receipt_long</Icon>,
          collapse: [
            {
              name: "List CM",
              key: "list-cm",
              route: "/applications/list-cm",
              component: <ListCM />,
            },
          ],
        },
      ];
    }
    return null;
  }

  function getReportRoutes() {
    const role = localStorage.getItem("ROLE");
    if (role === "ROLE_MANAGER" || role === "ROLE_ADMIN" || role === "ROLE_ENGINEER") {
      return [
        {
          name: "MTTR-MTBF",
          key: "mttr-mtbf",
          route: "/report/mttr-mtbf",
          component: <Report />,
        },
      ];
    }
    return null;
  }

  function getUserRoute() {
    const user = localStorage.getItem("USERNAME");
    if (user) {
      return user.toUpperCase();
    }
    return "";
  }

  const handleRoutes = () => {
    const newRoutes = [...customRoutes];
    const posDashboardSideNav = newRoutes.findIndex((route) => route.key === "dashboards");
    const pos = newRoutes.findIndex((route) => route.key === "assets");
    const posApplicationsSideNav = newRoutes.findIndex((route) => route.key === "applications");
    const posReportSideNav = newRoutes.findIndex((route) => route.key === "report");

    newRoutes[0] = { ...newRoutes[0], name: getUserRoute() };
    newRoutes[posDashboardSideNav].collapse = getDashboardRoutes();
    newRoutes[pos].collapse = getRoutesCustom();
    newRoutes[posApplicationsSideNav].collapse = getApplicationsRoutes();
    newRoutes[posReportSideNav].collapse = getReportRoutes();

    setCustomRoutes(newRoutes);
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
    handleRoutes();
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    handleRoutes();
    setTimeout(() => {
      setRender(true);
    }, 1000);
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route === null) {
        return null;
      }
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="PE Management"
            routes={customRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        <Route path="/sign-in" element={<SignInBasic />} />
        <Route path="/sign-up" element={<RegisterStepper />} />
        <Route path="/dashboards/history-machine" element={<HistoryMachine />} />
        <Route path="/asset/edit/:assetNumber" element={<EditAsset />} />
        <Route path="/asset/:assetNumber" element={<DetailAsset />} />
        <Route path="/cm/list-cm/:downtimeId" element={<DetailCM />} />
        <Route path="/applications/update-cm/:downtimeId" element={<UpdateCM />} />
        {localStorage.getItem("ACCESS_TOKEN") && getRoutes(customRoutes)}
        {render && <Route path="*" element={<Navigate to="/sign-in" />} />}
      </Routes>
    </ThemeProvider>
  );
}
