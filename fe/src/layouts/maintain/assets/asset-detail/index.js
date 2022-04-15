import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// ProductPage page components
import ProductImages from "layouts/maintain/assets/asset-detail/components/ProductImages";
import ProductInfo from "layouts/maintain/assets/asset-detail/components/AssetInfo";

// Data
import dataTableData from "layouts/maintain/assets/asset-detail/data/dataTableData";
import { getAssetByAssetNumber } from "api/assetAPI";
import MDButton from "components/MDButton";
import { Icon, Modal } from "@mui/material";

function ProductPage() {
  const [detailAsset, setDetailAsset] = useState({});
  const [partList, setPartList] = useState(dataTableData);
  const [open, setOpen] = useState(false);
  const { assetNumber } = useParams();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getDetailAsset = (data) => {
    getAssetByAssetNumber(data)
      .then((res) => {
        setDetailAsset(res.data.payload);
        setPartList({
          ...partList,
          rows: res.data.payload.partList.map((item) => ({
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
                <MDButton onClick={handleOpen} variant="text" color="dark">
                  <Icon>edit</Icon>&nbsp;edit
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
    getDetailAsset(assetNumber);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Card sx={{ overflow: "visible" }}>
          <MDBox p={3}>
            <MDBox mb={3}>
              <MDTypography variant="h5" fontWeight="medium">
                Asset Details
              </MDTypography>
            </MDBox>

            <Grid container spacing={3}>
              <Grid item xs={12} lg={6} xl={5}>
                <ProductImages />
              </Grid>
              <Grid item xs={12} lg={5} sx={{ mx: "auto" }}>
                <ProductInfo assetInfo={detailAsset} />
              </Grid>
            </Grid>

            <MDBox mt={8} mb={2}>
              <MDBox mb={1} ml={2}>
                <MDTypography variant="h5" fontWeight="medium">
                  List Parts
                </MDTypography>
              </MDBox>
              <DataTable table={partList} canSearch />
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <p>Test Modal</p>
      </Modal>
      <Footer />
    </DashboardLayout>
  );
}

export default ProductPage;
