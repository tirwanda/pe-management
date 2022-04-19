import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Backdrop, Box, Fade, Icon, Modal } from "@mui/material";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDSnackbar from "components/MDSnackbar";
import MDButton from "components/MDButton";

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
import { updatePart } from "api/partAPI";
import { getAssetByAssetNumber } from "api/assetAPI";

function ProductPage() {
  const [detailAsset, setDetailAsset] = useState({});
  const [partList, setPartList] = useState(dataTableData);
  const [partDetail, setPartDetail] = useState({});

  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const { assetNumber } = useParams();
  const navigate = useNavigate();

  const openSuccessSB = (response) => {
    setSuccessSB(true);
    setMessage(response);
  };

  const closeSuccessSB = () => setSuccessSB(false);

  const openErrorSB = (response) => {
    setErrorSB(true);
    setMessage(response);
  };

  const closeErrorSB = () => setErrorSB(false);

  const handleOpen = (data) => {
    setPartDetail(data);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    setPartDetail({
      ...partDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await updatePart(partDetail);
      setPartDetail(response.data.payload);
      setOpen(false);
      openSuccessSB(response.data.payload.partName);
    } catch (error) {
      if (error.response === 400) {
        openErrorSB(error.response.data.message);
      } else if (error.response === 403) {
        openErrorSB(error.response.data.message);
        navigate("/sign-in");
      } else {
        openErrorSB("Something went wrong");
      }
    }
  };

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
                <MDButton onClick={() => handleOpen(item)} variant="text" color="dark">
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
  }, [partDetail]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Successfully updated part"
      content={`Congratulations, you have successfully updated part with the part name ${message}`}
      dateTime="2 seconds ago"
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
      title="Failed to updating user profile"
      content={message}
      dateTime="2 second ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

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
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="success"
              mx={1}
              mt={-6}
              p={2}
              mb={4}
              textAlign="center"
            >
              <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
                Edit Part
              </MDTypography>
            </MDBox>
            <MDBox component="form" role="form">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <MDBox mb={2}>
                    <MDInput
                      name="partNumber"
                      disabled
                      type="text"
                      label="Part Number"
                      variant="standard"
                      fullWidth
                      value={partDetail.partNumber}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox mb={2}>
                    <MDInput
                      name="partName"
                      type="text"
                      label="Part Name"
                      variant="standard"
                      fullWidth
                      value={partDetail.partName}
                      onChange={handleInputChange}
                    />
                  </MDBox>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <MDBox mb={2}>
                    <MDInput
                      name="stock"
                      type="number"
                      label="Stock"
                      variant="standard"
                      fullWidth
                      value={partDetail.stock}
                      onChange={handleInputChange}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MDBox mb={2}>
                    <MDInput
                      name="uom"
                      type="text"
                      label="UOM"
                      variant="standard"
                      fullWidth
                      value={partDetail.uom}
                      onChange={handleInputChange}
                    />
                  </MDBox>
                </Grid>
                <MDBox mt={3} ml="auto" display="flex">
                  <MDBox mr={1}>
                    <MDButton
                      mr={5}
                      variant="gradient"
                      color="info"
                      size="small"
                      onClick={handleUpdate}
                    >
                      Update
                    </MDButton>
                  </MDBox>
                  <MDButton
                    mr={5}
                    variant="gradient"
                    color="secondary"
                    size="small"
                    onClick={handleClose}
                  >
                    Cancle
                  </MDButton>
                </MDBox>
              </Grid>
            </MDBox>
          </Box>
        </Fade>
      </Modal>
      {renderSuccessSB}
      {renderErrorSB}
      <Footer />
    </DashboardLayout>
  );
}

export default ProductPage;
