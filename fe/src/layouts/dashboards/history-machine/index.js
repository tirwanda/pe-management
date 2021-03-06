import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDBadgeDot from "components/MDBadgeDot";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultStatisticsCard from "examples/Cards/StatisticsCards/DefaultStatisticsCard";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import DataTable from "examples/Tables/DataTable";

// Sales dashboard components
import ChannelsChart from "layouts/dashboards/history-machine/components/ChannelsChart";

// Data
import defaultLineChartData from "layouts/dashboards/history-machine/data/defaultLineChartData";
import dataTableData from "layouts/dashboards/history-machine/data/dataTableData";
import jwtDecode from "jwt-decode";
import { getUserData } from "api/userAPI";

// Context
import { useMaterialUIController, setUser } from "context";
import { getPieChartAssetData } from "api/dashboardAPI";

function HistoryMachine() {
  const [, dispatch] = useMaterialUIController();
  const [lines, setLines] = useState(0);
  const [assets, setAssets] = useState(0);
  const [labels, setLabels] = useState([]);
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [pieChartData, setPieChartData] = useState({});
  const navigate = useNavigate();

  const getToken = async () => {
    try {
      const decode = jwtDecode(localStorage.getItem("ACCESS_TOKEN"));
      localStorage.setItem("EXPIRES_IN", decode.exp);
    } catch (error) {
      localStorage.clear();
      navigate("/sign-in");
    }
  };

  const getUser = async () => {
    await getUserData()
      .then((response) => {
        setUser(dispatch, response.data.payload);
        setLines(response.data.payload.lines.length);
        response.data.payload.lines.map((line) => setAssets(assets + line.assets.length));
      })
      .catch((error) => {
        if (error.response) {
          localStorage.clear();
          navigate("/sign-in");
        }
      });
  };

  const getPieChartData = async () => {
    await getPieChartAssetData()
      .then((response) => {
        setPieChartData(response.data);
        setLabels(response.data.labels);
        setBackgroundColors(response.data.datasets.backgroundColors);
      })
      .catch((error) => {
        if (error.response) {
          localStorage.clear();
          navigate("/sign-in");
        }
      });
  };

  useEffect(() => {
    getToken();
    getUser();
    getPieChartData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard title="Total Line" count={lines} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard title="Total Assets" count={assets} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard title="Model" count="7" />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <ChannelsChart data={pieChartData} />
            </Grid>
            <Grid item xs={12} sm={6} lg={8}>
              <DefaultLineChart
                title="Downtime"
                description={
                  <MDBox display="flex" justifyContent="space-between">
                    <MDBox display="flex" ml={-1}>
                      {labels.map((label, index) => (
                        <MDBadgeDot
                          key={label}
                          color={backgroundColors[index]}
                          size="sm"
                          badgeContent={label}
                        />
                      ))}
                    </MDBox>
                    <MDBox mt={-4} mr={-1} position="absolute" right="1.5rem">
                      <Tooltip title="See which ads perform better" placement="left" arrow>
                        <MDButton
                          variant="outlined"
                          color="secondary"
                          size="small"
                          circular
                          iconOnly
                        >
                          <Icon>priority_high</Icon>
                        </MDButton>
                      </Tooltip>
                    </MDBox>
                  </MDBox>
                }
                chart={defaultLineChartData}
              />
            </Grid>
          </Grid>
        </MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3} px={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Top Downtime Machine
                </MDTypography>
              </MDBox>
              <MDBox py={1}>
                <DataTable
                  table={dataTableData}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  isSorted={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default HistoryMachine;
