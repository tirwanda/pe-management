import PropTypes from "prop-types";

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

// Material Dashboard 2 PRO React contexts
import { useMaterialUIController } from "context";

function ChannelsChart({ data }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { labels } = data;

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
            <PieChart chart={data} height="12.5rem" />
          </Grid>
          <Grid item xs={5}>
            <MDBox pr={1}>
              {labels &&
                labels.map((label, index) => (
                  <MDBox mb={1} key={label}>
                    <MDBadgeDot
                      color={data.datasets.backgroundColors[index]}
                      size="sm"
                      badgeContent={label}
                    />
                  </MDBox>
                ))}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox
        pt={2}
        pb={2}
        px={2}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        mt="auto"
      >
        <MDBox width={{ xs: "100%", sm: "60%" }} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            {labels &&
              data.labels.map((label, index) => (
                <p>
                  <strong>{data.datasets.data[index]}</strong> Machine di {label}.
                </p>
              ))}
          </MDTypography>
        </MDBox>
        <MDBox width={{ xs: "100%", sm: "40%" }} textAlign="right" mt={{ xs: 2, sm: "auto" }}>
          <MDButton color={darkMode ? "white" : "light"}>read more</MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

ChannelsChart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.shape({
      label: PropTypes.string,
      backgroundColors: PropTypes.arrayOf(PropTypes.string),
      data: PropTypes.arrayOf(PropTypes.number),
    }),
  }).isRequired,
};

export default ChannelsChart;
