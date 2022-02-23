// @mui material components
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBadgeDot from "components/MDBadgeDot";
import PieChart from "examples/Charts/PieChart";

// Data
import channelChartData from "layouts/dashboards/historyMachine/components/ChannelsChart/data";

// Material Dashboard 2 PRO React contexts
import { useMaterialUIController } from "context";

function ChannelsChart() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6">Assets</MDTypography>
        <Tooltip title="See traffic channels" placement="bottom" arrow>
          <MDButton variant="outlined" color="secondary" size="small" circular iconOnly>
            <Icon>priority_high</Icon>
          </MDButton>
        </Tooltip>
      </MDBox>
      <MDBox mt={3}>
        <Grid container alignItems="center">
          <Grid item xs={7}>
            <PieChart chart={channelChartData} height="12.5rem" />
          </Grid>
          <Grid item xs={5}>
            <MDBox pr={1}>
              <MDBox mb={1}>
                <MDBadgeDot color="info" size="sm" badgeContent="Line A" />
              </MDBox>
              <MDBox mb={1}>
                <MDBadgeDot color="primary" size="sm" badgeContent="Mini Line" />
              </MDBox>
              <MDBox mb={1}>
                <MDBadgeDot color="dark" size="sm" badgeContent="MM3" />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox
        pt={4}
        pb={2}
        px={2}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        mt="auto"
      >
        <MDBox width={{ xs: "100%", sm: "60%" }} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            Terdapat <strong>37</strong> Machine di Line A, <strong>43</strong> Machine di MM3, dan{" "}
            <strong>14</strong> Machine di Mini Line
          </MDTypography>
        </MDBox>
        <MDBox width={{ xs: "100%", sm: "40%" }} textAlign="right" mt={{ xs: 2, sm: "auto" }}>
          <MDButton color={darkMode ? "white" : "light"}>read more</MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ChannelsChart;
