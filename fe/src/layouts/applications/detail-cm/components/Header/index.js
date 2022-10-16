// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Header() {
  return (
    <Card id="profile">
      <MDBox p={2}>
        <Grid container spacing={3} alignItems="center" justifyContent="space-around">
          <Grid item>
            <MDBox height="100%" lineHeight={1} p={3} textAlign="center">
              <MDTypography variant="h4" fontWeight="medium" mt={1}>
                Corrective Maintenance
              </MDTypography>
              <MDTypography
                display="block"
                variant="button"
                color="inherit"
                my={1}
                fontWeight="regular"
              >
                This information will describe more about the Downtime Machine.
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default Header;
