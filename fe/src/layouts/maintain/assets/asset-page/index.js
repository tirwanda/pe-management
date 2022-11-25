import { useEffect, useState } from "react";
import PropTypes from "prop-types";
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
import dataTableData from "layouts/maintain/assets/asset-page/data/dataTableData";
import { getLineData, deleteAsset } from "api/assetAPI";
import MDSnackbar from "components/MDSnackbar";

function AssetPage({ title, lineCode }) {
  const [asset, setAsset] = useState(dataTableData);
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

  const handleDeleteAsset = async (assetId) => {
    await deleteAsset(assetId)
      .then((res) => {
        setLastDelete(res.data.payload);
        openSuccessSB(res.data.payload.assetName);
      })
      .catch((error) => {
        if (error.response) {
          openErrorSB(error.response.data.message);
        } else {
          openErrorSB("Network Error");
        }
      });
  };

  const getAsset = (data) => {
    const role = localStorage.getItem("ROLE");

    if (role === "ROLE_MANAGER" || role === "ROLE_ADMIN" || role === "ROLE_ENGINEER") {
      getLineData(data)
        .then((res) => {
          setAsset({
            ...asset,
            rows: res.data.payload.assets.map((item) => ({
              ...item,
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
                    onClick={() => handleDeleteAsset(item.assetId)}
                  >
                    <Icon>delete</Icon>&nbsp;delete
                  </MDButton>
                  <MDButton
                    component={Link}
                    to={`/asset/edit/${item.assetNumber}`}
                    variant="text"
                    color="dark"
                  >
                    <Icon>edit</Icon>&nbsp;edit
                  </MDButton>
                  <MDButton
                    variant="text"
                    color="dark"
                    component={Link}
                    to={`/asset/${item.assetNumber}`}
                  >
                    <Icon>preview</Icon>&nbsp;view
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
    }

    if (role === "ROLE_PRODUCTION") {
      getLineData(data)
        .then((res) => {
          setAsset({
            ...asset,
            rows: res.data.payload.assets.map((item) => ({
              ...item,
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
                    color="dark"
                    component={Link}
                    to={`/asset/${item.assetNumber}`}
                  >
                    <Icon>preview</Icon>&nbsp;view
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
    }
  };

  useEffect(() => {
    getAsset(lineCode);
  }, [lineCode, lastDelete]);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Success"
      content={`Successfully deleting asset ${message}`}
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
      title="Failed to create line"
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
              {title}
            </MDTypography>
            <MDTypography variant="button" color="text">
              List of Assets {title}
            </MDTypography>
          </MDBox>
          <DataTable table={asset} canSearch />
        </Card>
        {renderSuccessSB}
        {renderErrorSB}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

AssetPage.propTypes = {
  title: PropTypes.string.isRequired,
  lineCode: PropTypes.string.isRequired,
};

export default AssetPage;
