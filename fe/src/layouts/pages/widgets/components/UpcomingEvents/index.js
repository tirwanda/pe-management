// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DefaultItem from "examples/Items/DefaultItem";

function UpcomingEvents() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={2} px={2} lineHeight={1}>
        <MDTypography variant="h6" fontWeight="medium">
          Upcoming events
        </MDTypography>
        <MDTypography variant="button" color="text" fontWeight="regular">
          Joined
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <DefaultItem
          color="dark"
          icon="savings"
          title="Cyber Week"
          description="27 March 2020, at 12:30 PM"
        />
        <MDBox mt={2.5}>
          <DefaultItem
            color="dark"
            icon="notifications_active"
            title="Meeting with Marry"
            description="24 March 2020, at 10:00 PM"
          />
        </MDBox>
        <MDBox mt={2.5}>
          <DefaultItem
            color="dark"
            icon="task"
            title="Tasks planification"
            description="24 March 2020, at 12:30 AM"
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default UpcomingEvents;
