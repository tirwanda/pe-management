import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import { getAllDowntime, deleteDowntime } from "api/downtime";
import MDSnackbar from "components/MDSnackbar";
import dataTableData from "./data/dataTableData";

function ListCM() {
  const [listDowntime, setListDowntime] = useState(dataTableData);
  const [lastDelete, setLastDelete] = useState({});
  const [successSB, setSuccesSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const openSuccessSB = (data) => {
    setSuccesSB(true);
    setMessage(data);
  };
  const closeSuccessSB = () => setSuccesSB(false);
  const openErrorSB = (data) => {
    setErrorSB(true);
    setMessage(data);
  };
  const closeErrorSB = () => setErrorSB(false);

  const handleDeleteDowntime = async (downtimeId) => {
    await deleteDowntime(downtimeId)
      .then((res) => {
        setLastDelete(res.data.payload);
        openSuccessSB(res.data.payload.downtimeId);
      })
      .catch((error) => {
        if (error.response) {
          openErrorSB(error.response.data.message);
        } else {
          openErrorSB("Network Error");
        }
      });
  };

  const getListDowntime = () => {
    getAllDowntime()
      .then((res) => {
        setListDowntime({
          ...listDowntime,
          rows: res.data.payload.map((downtime) => ({
            ...downtime,
            startedDate: new Date(downtime.startedDate).toLocaleString(),
            actions: (
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                mt={{ xs: 2, sm: 0 }}
                mr={{ xs: -1.5, sm: 0 }}
              >
                <MDButton
                  variant="text"
                  color="error"
                  onClick={() => handleDeleteDowntime(downtime.downtimeId)}
                >
                  <Icon>delete</Icon>
                </MDButton>
                <MDButton
                  component={Link}
                  variant="text"
                  color="dark"
                  to={`/cm/update-cm/${downtime.downtimeId}`}
                >
                  <Icon>edit</Icon>
                </MDButton>
                <MDButton
                  variant="text"
                  color="dark"
                  component={Link}
                  to={`/cm/list-cm/${downtime.downtimeId}`}
                >
                  <Icon>preview</Icon>
                </MDButton>
              </MDBox>
            ),
          })),
        });
      })
      .catch(() => {
        localStorage.clear();
        navigate("/sign-in");
      });
  };

  useEffect(() => {
    getListDowntime();
  }, []);

  useEffect(() => {
    getListDowntime();
  }, [lastDelete]);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Success"
      content={`Successfully deleting Downtime Id ${message}`}
      dateTime="A few seconds ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Failed Deleting Downtime"
      content={message}
      dateTime="A few secons ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Data Corrective Maintenance
            </MDTypography>
            <MDTypography variant="button" color="text">
              List of Corrective Maintenance
            </MDTypography>
          </MDBox>
          <DataTable table={listDowntime} canSearch />
        </Card>
        {renderSuccessSB}
        {renderErrorSB}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ListCM;
