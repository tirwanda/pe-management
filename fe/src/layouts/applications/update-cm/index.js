import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Create CM page components
import Header from "layouts/applications/update-cm/components/Header";
import DowntimeInfoUpdate from "layouts/applications/update-cm/components/DowntimeInfoUpdate";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Data
import { getDowntimeById } from "api/downtime";

function UpdateCM() {
  const { downtimeId } = useParams();
  const [downtimeInfo, setDowntimeInfo] = useState(null);

  const Navigate = useNavigate();

  const getDowntimeData = async (id) => {
    await getDowntimeById(id)
      .then((res) => {
        setDowntimeInfo(res.data.payload);
      })
      .catch(() => {
        localStorage.clear();
        Navigate("/sign-in");
      });
  };

  useEffect(() => {
    getDowntimeData(downtimeId);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Header />
                </Grid>
                <Grid item xs={12}>
                  {downtimeInfo && <DowntimeInfoUpdate downtimeInfo={downtimeInfo} />}
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default UpdateCM;
