import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// EditProduct page components
import ProductImage from "layouts/maintain/assets/edit-asset/components/ProductImage";
import ProductInfo from "layouts/maintain/assets/edit-asset/components/ProductInfo";
import Socials from "layouts/maintain/assets/edit-asset/components/Socials";
import Pricing from "layouts/maintain/assets/edit-asset/components/Pricing";

// Data
import { getAssetByAssetNumber } from "api/assetAPI";

function EditAsset() {
  const [detailAsset, setDetailAsset] = useState({});
  const { assetNumber } = useParams();
  const navigate = useNavigate();

  const getDetailAsset = (data) => {
    getAssetByAssetNumber(data)
      .then((res) => {
        setDetailAsset(res.data.payload);
      })
      .catch(() => {
        localStorage.clear();
        navigate("/sign-in");
      });
  };

  useEffect(() => {
    getDetailAsset(assetNumber);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox mb={6}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} lg={6} mb={3}>
              <MDTypography variant="h4" fontWeight="medium">
                {detailAsset.assetName || ""}
              </MDTypography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <MDBox display="flex" justifyContent="flex-end">
                <MDButton variant="gradient" color="info">
                  save
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <ProductImage />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductInfo />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Socials />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Pricing />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EditAsset;
