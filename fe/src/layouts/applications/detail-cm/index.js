/* eslint-disable react/no-array-index-key */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Divider } from "@mui/material";

// Layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Images
import logoXYZ from "assets/images/xyz-brand-white.png";
import logoXYZDark from "assets/images/xyz-brand-dark.png";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

// Data
import { getDowntimeById, approvalDowntime } from "api/downtime";
import MDSnackbar from "components/MDSnackbar";
import dataTablePartList from "./data/dataTablePartList";
import dataTableItemCheck from "./data/dataTableItemCheck";
import dataTableApd from "./data/dataTableApd";

function DetailCM() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [downtimeData, setDowntimeData] = useState({});
  const [partList, setPartList] = useState(dataTablePartList);
  const [itemCheck, setItemCheck] = useState(dataTableItemCheck);
  const [apdList, setApdList] = useState(dataTableApd);
  const [role, setRole] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const [successSB, setSuccesSB] = useState(false);
  const [message, setMessage] = useState("");

  const { downtimeId } = useParams();
  const navigate = useNavigate();

  const openSuccessSB = (data) => {
    setSuccesSB(true);
    setMessage(data);
  };

  const closeSuccessSB = () => setSuccesSB(false);

  const handleApproval = async (status) => {
    const data = { ...downtimeData, approval: status };

    await approvalDowntime(data)
      .then((res) => {
        openSuccessSB(res.data.payload.approval);
      })
      .catch(() => {
        navigate("/sign-in");
      });

    setIsUpdated(true);
  };

  const getDetailDowntime = async (id) => {
    await getDowntimeById(id)
      .then((res) => {
        setDowntimeData(res.data.payload);
        setPartList({
          ...partList,
          rows: res.data.payload.replacedParts,
        });
        setItemCheck({
          ...itemCheck,
          rows: res.data.payload.itemChecks,
        });
        setApdList({
          ...apdList,
          rows: res.data.payload.apdList,
        });
      })
      .catch(() => {
        navigate("/sign-in");
      });
  };

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Successfully save data"
      content={`Successfully Change Approval to ${message}`}
      dateTime="A few seconds ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  useEffect(() => {
    getDetailDowntime(downtimeId);
    setRole(localStorage.getItem("ROLE"));
  }, []);

  useEffect(() => {
    getDetailDowntime(downtimeId);
    setRole(localStorage.getItem("ROLE"));
  }, [isUpdated]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={{ xs: 4, md: 10 }} mb={{ xs: 4, md: 8 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>
            <Card>
              {/* Invoice header */}
              <MDBox p={3}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={12} md={4}>
                    <MDBox
                      component="img"
                      src={darkMode ? logoXYZ : logoXYZDark}
                      width="30%"
                      p={1}
                      mb={1}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <MDTypography
                      variant="h4"
                      color={darkMode ? "text" : "secondary"}
                      fontWeight="medium"
                    >
                      Corrective Maintenance
                    </MDTypography>
                  </Grid>
                </Grid>
                <MDBox mt={{ xs: 5, md: 5 }}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} md={6}>
                      <MDBox
                        width="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign="left"
                        mt={{ xs: 3, md: 0 }}
                      >
                        <MDBox width="100%">
                          <MDTypography
                            variant="h6"
                            color={darkMode ? "text" : "secondary"}
                            fontWeight="regular"
                          >
                            Work Order :
                          </MDTypography>
                        </MDBox>
                        <MDBox width="100%">
                          <MDTypography variant="h6" fontWeight="medium">
                            {downtimeData.workOrder || ""}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                      <MDBox
                        width="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign="left"
                      >
                        <MDBox width="100%">
                          <MDTypography
                            variant="h6"
                            color={darkMode ? "text" : "secondary"}
                            fontWeight="regular"
                          >
                            Asset Name :
                          </MDTypography>
                        </MDBox>
                        <MDBox width="100%">
                          <MDTypography variant="h6" fontWeight="medium">
                            {downtimeData.assetName || ""}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDBox
                        width="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign="right"
                        mt={{ xs: 3, md: 0 }}
                      >
                        <MDBox width="100%">
                          <MDTypography
                            variant="h6"
                            color={darkMode ? "text" : "secondary"}
                            fontWeight="regular"
                          >
                            Started date :
                          </MDTypography>
                        </MDBox>
                        <MDBox width="100%">
                          <MDTypography variant="h6" fontWeight="medium">
                            {new Date(downtimeData.startedDate).toLocaleString() || ""}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                      <MDBox
                        width="100%"
                        display="flex"
                        flexDirection="column"
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign="right"
                      >
                        <MDBox width="100%">
                          <MDTypography
                            variant="h6"
                            color={darkMode ? "text" : "secondary"}
                            fontWeight="regular"
                          >
                            Completed date :
                          </MDTypography>
                        </MDBox>
                        <MDBox width="100%">
                          <MDTypography variant="h6" fontWeight="medium">
                            {new Date(downtimeData.completedDate).toLocaleString() || ""}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
                <Divider />
                <MDBox mt={{ xs: 3, md: 3 }}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} md={6}>
                      <MDBox
                        width="100%"
                        display="flex"
                        flexDirection="row"
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign="left"
                        mt={{ xs: 3, md: 0 }}
                      >
                        <MDBox width="30%">
                          <MDTypography
                            variant="h6"
                            color={darkMode ? "text" : "secondary"}
                            fontWeight="regular"
                          >
                            Department :
                          </MDTypography>
                        </MDBox>
                        <MDBox width="70%">
                          <MDTypography variant="h6" fontWeight="medium">
                            {downtimeData.department || ""}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                      <MDBox
                        width="100%"
                        display="flex"
                        flexDirection="row"
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign="left"
                      >
                        <MDBox width="30%">
                          <MDTypography
                            variant="h6"
                            color={darkMode ? "text" : "secondary"}
                            fontWeight="regular"
                          >
                            Cost Center :
                          </MDTypography>
                        </MDBox>
                        <MDBox width="70%">
                          <MDTypography variant="h6" fontWeight="medium">
                            {downtimeData.costCenter || ""}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                      <MDBox
                        width="100%"
                        display="flex"
                        flexDirection="row"
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign="left"
                      >
                        <MDBox width="30%">
                          <MDTypography
                            variant="h6"
                            color={darkMode ? "text" : "secondary"}
                            fontWeight="regular"
                          >
                            Status :
                          </MDTypography>
                        </MDBox>
                        <MDBox width="70%">
                          <MDTypography variant="h6" fontWeight="medium">
                            {downtimeData.status || ""}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDBox
                        width="100%"
                        display="flex"
                        flexDirection="row"
                        alignItems={{ xs: "flex-start", md: "flex-end" }}
                        textAlign="right"
                        mt={{ xs: 3, md: 0 }}
                      >
                        <MDBox width="70%">
                          <MDTypography
                            variant="h6"
                            color={darkMode ? "text" : "secondary"}
                            fontWeight="regular"
                          >
                            WO Type :
                          </MDTypography>
                        </MDBox>
                        <MDBox width="30%">
                          <MDTypography variant="h6" fontWeight="medium">
                            {downtimeData.wotype || ""}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                      <MDBox
                        width="100%"
                        display="flex"
                        flexDirection="row"
                        alignItems={{ xs: "flex-start", md: "flex-end" }}
                        textAlign="right"
                      >
                        <MDBox width="70%">
                          <MDTypography
                            variant="h6"
                            color={darkMode ? "text" : "secondary"}
                            fontWeight="regular"
                          >
                            Request By :
                          </MDTypography>
                        </MDBox>
                        <MDBox width="30%">
                          <MDTypography variant="h6" fontWeight="medium">
                            {downtimeData.requestBy || ""}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                      <MDBox
                        width="100%"
                        display="flex"
                        flexDirection="row"
                        alignItems={{ xs: "flex-start", md: "flex-end" }}
                        textAlign="right"
                      >
                        <MDBox width="70%">
                          <MDTypography
                            variant="h6"
                            color={darkMode ? "text" : "secondary"}
                            fontWeight="regular"
                          >
                            Approval :
                          </MDTypography>
                        </MDBox>
                        <MDBox width="30%">
                          <MDTypography variant="h6" fontWeight="medium">
                            {downtimeData.approval || ""}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
                <Divider />
                <MDBox mt={{ xs: 3, md: 3 }}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} md={6}>
                      <MDBox
                        width="100%"
                        display="flex"
                        flexDirection="row"
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign="left"
                        mt={{ xs: 3, md: 0 }}
                      >
                        <MDBox width="35%">
                          <MDTypography
                            variant="h6"
                            color={darkMode ? "text" : "secondary"}
                            fontWeight="regular"
                          >
                            Section Code :
                          </MDTypography>
                        </MDBox>
                        <MDBox width="65%">
                          <MDTypography variant="h6" fontWeight="medium">
                            {downtimeData.sectionCode || ""}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                      <MDBox
                        width="100%"
                        display="flex"
                        flexDirection="row"
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign="left"
                      >
                        <MDBox width="30%">
                          <MDTypography
                            variant="h6"
                            color={darkMode ? "text" : "secondary"}
                            fontWeight="regular"
                          >
                            Location :
                          </MDTypography>
                        </MDBox>
                        <MDBox width="70%">
                          <MDTypography variant="h6" fontWeight="medium">
                            {downtimeData.lineName || ""}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <MDBox
                        width="100%"
                        display="flex"
                        flexDirection="row"
                        alignItems={{ xs: "flex-start", md: "flex-end" }}
                        textAlign="right"
                        mt={{ xs: 3, md: 0 }}
                      >
                        <MDBox width="70%">
                          <MDTypography
                            variant="h6"
                            color={darkMode ? "text" : "secondary"}
                            fontWeight="regular"
                          >
                            Downtime Minute :
                          </MDTypography>
                        </MDBox>
                        <MDBox width="30%">
                          <MDTypography variant="h6" fontWeight="medium">
                            {downtimeData.downtimeMinute || ""}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
              <Divider />

              {/* Replaced Parts table */}
              <MDBox px={3} pb={1} pt={3}>
                <MDTypography variant="h5" fontWeight="medium">
                  Replaced Parts
                </MDTypography>
              </MDBox>
              <MDBox px={3}>
                <DataTable
                  table={partList}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  isSorted={false}
                  noEndBorder
                />
              </MDBox>

              {/* Item Checks table */}
              <MDBox px={3} pb={1} pt={3}>
                <MDTypography variant="h5" fontWeight="medium">
                  Item Checks
                </MDTypography>
              </MDBox>
              <MDBox px={3}>
                <DataTable
                  table={itemCheck}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  isSorted={false}
                  noEndBorder
                />
              </MDBox>

              {/* APD table */}
              <MDBox px={3} pb={1} pt={3}>
                <MDTypography variant="h5" fontWeight="medium">
                  APD
                </MDTypography>
              </MDBox>
              <MDBox px={3}>
                <DataTable
                  table={apdList}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  isSorted={false}
                  noEndBorder
                />
              </MDBox>

              {/* Invoice footer */}
              <MDBox p={3} mt={7}>
                <Grid container>
                  <Grid item xs={12} lg={5}>
                    <MDTypography variant="h5" fontWeight="medium">
                      Thank you!
                    </MDTypography>
                    <MDBox mt={1} mb={2} lineHeight={0}>
                      <MDTypography variant="button" color={darkMode ? "text" : "secondary"}>
                        If you encounter any issues related to the invoice you can contact us at:
                      </MDTypography>
                    </MDBox>
                    <MDTypography
                      component="span"
                      variant="h6"
                      fontWeight="regular"
                      color={darkMode ? "text" : "secondary"}
                    >
                      email:{" "}
                      <MDTypography component="span" variant="h6" fontWeight="regular">
                        pemanagement@gmail.com
                      </MDTypography>
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} lg={7}>
                    <MDBox
                      width="100%"
                      display="flex"
                      height={{ xs: "auto", md: "100%" }}
                      justifyContent="flex-end"
                      alignItems="flex-end"
                    >
                      {(role === "ROLE_ADMIN" || role === "ROLE_MANAGER") &&
                        downtimeData.approval === "Waiting" && (
                          <MDBox mr={2}>
                            <MDButton
                              variant="gradient"
                              color="success"
                              size="small"
                              onClick={() => handleApproval("Approved")}
                            >
                              Approve
                            </MDButton>
                          </MDBox>
                        )}

                      {(role === "ROLE_ADMIN" || role === "ROLE_MANAGER") &&
                        downtimeData.approval === "Waiting" && (
                          <MDBox mr={2}>
                            <MDButton
                              variant="gradient"
                              color="warning"
                              size="small"
                              onClick={() => handleApproval("Rejected")}
                            >
                              Reject
                            </MDButton>
                          </MDBox>
                        )}

                      <MDButton
                        variant="gradient"
                        color="light"
                        size="small"
                        onClick={() => navigate("/cm/list-cm")}
                      >
                        Cancel
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {renderSuccessSB}
    </DashboardLayout>
  );
}

export default DetailCM;
