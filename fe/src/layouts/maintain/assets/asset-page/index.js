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
import { getLineData } from "api/assetAPI";

function AssetPage({ title, lineCode }) {
  const [asset, setAsset] = useState(dataTableData);
  const navigate = useNavigate();

  const getAsset = (data) => {
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
                <MDButton variant="text" color="error">
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
                <MDButton variant="text" color="dark">
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
  };

  useEffect(() => {
    getAsset(lineCode);
  }, []);

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
