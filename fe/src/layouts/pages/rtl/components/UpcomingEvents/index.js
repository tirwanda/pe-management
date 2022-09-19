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
          الأحداث القادمة
        </MDTypography>
        <MDTypography variant="button" color="text" fontWeight="regular">
          انضم
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <DefaultItem
          color="dark"
          icon="savings"
          title="أسبوع الإنترنت"
          description="01 يونيو 2021, ي 12:30 PM"
        />
        <MDBox mt={2.5}>
          <DefaultItem
            color="dark"
            icon="notifications_active"
            title="لقاء مع ماري"
            description="24 مايو 2021, ي 10:00 PM"
          />
        </MDBox>
        <MDBox mt={2.5}>
          <DefaultItem
            color="dark"
            icon="task"
            title="تخطيط المهمة"
            description="25 مايو 2021, ي 10:00 PM"
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default UpcomingEvents;
