import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// NewProduct page components
import FormField from "layouts/maintain/assets/edit-asset/components/FormField";

// Data
import { updateAsset } from "api/assetAPI";

function ProductInfo({ assetInfo }) {
  const [data, setData] = useState(assetInfo);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await updateAsset(data);
      openSuccessSB(response.data.payload.assetName);
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

  useEffect(() => {
    setData(assetInfo);
  }, [assetInfo]);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Successfully updated profile"
      content={`Congratulations, you have successfully updated asset with the asset name ${message}`}
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
      title="Failed to updating asset detail"
      content={message}
      dateTime="2 second ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="h5">Asset Information</MDTypography>
        <MDBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField
                name="assetName"
                type="text"
                label="Asset Name"
                value={data.assetName || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                name="assetNumber"
                type="text"
                label="Asset Number"
                value={data.assetNumber || ""}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField
                name="assetLocation"
                type="text"
                label="Asset Location"
                value={data.assetLocation || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                name="assetFunction"
                type="text"
                label="Asset Function"
                value={data.assetFunction || ""}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField
                name="process"
                type="text"
                label="Machine Process"
                value={data.process || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                name="output"
                type="text"
                label="Machine Output"
                value={data.output || ""}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField
                name="status"
                type="text"
                label="Asset Status"
                value={data.status || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField
                name="lastPoPrice"
                type="number"
                label="Last PO Price (Rp)"
                value={data.lastPoPrice || ""}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox ml="auto" mt={3}>
          <MDButton variant="gradient" color="dark" size="small" onClick={handleUpdate}>
            Update Asset
          </MDButton>
        </MDBox>
      </MDBox>
      {renderSuccessSB}
      {renderErrorSB}
    </Card>
  );
}

ProductInfo.defaultProps = {
  assetInfo: {},
};

ProductInfo.propTypes = {
  assetInfo: PropTypes.shape({
    assetId: PropTypes.number,
    assetNumber: PropTypes.string,
    assetName: PropTypes.string,
    status: PropTypes.string,
    assetLocation: PropTypes.string,
    assetFunction: PropTypes.string,
    process: PropTypes.string,
    output: PropTypes.string,
    lastPoPrice: PropTypes.number,
  }),
};

export default ProductInfo;
