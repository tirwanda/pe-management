/* eslint-disable react/no-array-index-key */
import { useNavigate, useParams } from "react-router-dom";

// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Settings page components
import FormField from "layouts/applications/create-cm/components/FormField";

// Data
import { getDowntimeById } from "api/downtime";
import { useEffect, useState } from "react";

function DetailDowntime() {
  const [downtimeData, setDowntimeData] = useState({});
  const { downtimeId } = useParams();
  const navigate = useNavigate();

  const getDetailDowntime = async (id) => {
    await getDowntimeById(id)
      .then((res) => {
        setDowntimeData(res.data.payload);
      })
      .catch(() => {
        navigate("/sign-in");
      });
  };

  useEffect(() => {
    getDetailDowntime(downtimeId);
  }, []);

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <MDBox p={3}>
        <MDTypography variant="h5">Downtime Info</MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              disable="true"
              name="lineName"
              label="Line Name"
              value={downtimeData.lineName || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              name="assetName"
              label="Asset Name"
              disable="true"
              value={downtimeData.assetName || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              disable="true"
              name="startedDate"
              label="Started Date"
              value={new Date(downtimeData.startedDate).toLocaleString() || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              name="completedDate"
              label="Completed Date"
              disable="true"
              value={new Date(downtimeData.completedDate).toLocaleString() || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              disable="true"
              name="workOrder"
              label="Work Order"
              value={downtimeData.workOrder || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              disable="true"
              name="status"
              label="Status"
              value={downtimeData.status || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              disable="true"
              name="department"
              label="Department"
              value={downtimeData.department || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              disable="true"
              name="costCenter"
              label="Cost Center"
              value={downtimeData.costCenter || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              disable="true"
              name="sectionCode"
              label="Section Code"
              value={downtimeData.sectionCode || ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              disable="true"
              name="requestBy"
              label="Request By (NRP)"
              type="number"
              value={downtimeData.requestBy || ""}
            />
          </Grid>
        </Grid>

        <Grid container mt={5} mb={3}>
          <Grid item xs={12} sm={12}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h5" fontWeight="medium">
                Part List
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>

        <Grid container mt={5} mb={3}>
          <Grid item xs={12} sm={12}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h5" fontWeight="medium">
                Item Check
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>

        <Grid container mt={5} mb={3}>
          <Grid item xs={12} sm={12}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h5" fontWeight="medium">
                APD
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>

        <Grid container spacing={3} mb={2} />

        <Grid container>
          <MDBox ml="auto" mt={3}>
            <MDButton variant="gradient" color="dark">
              Submit
            </MDButton>
          </MDBox>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default DetailDowntime;
