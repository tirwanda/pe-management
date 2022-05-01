import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// NewProduct page components
import FormField from "layouts/maintain/assets/new-asset/components/FormField";

function AssetInfo({ formData }) {
  const { formField, values, errors, touched } = formData;
  const {
    assetNumber,
    assetName,
    status,
    assetLocation,
    assetFunction,
    process,
    output,
    lastPoPrice,
  } = formField;
  const {
    assetNumber: assetNumberV,
    assetName: assetNameV,
    status: statusV,
    assetLocation: assetLocationV,
    assetFunction: assetFunctionV,
    process: processV,
    output: outputV,
    lastPoPrice: lastPoPriceV,
  } = values;

  return (
    <MDBox>
      <MDTypography variant="h5">Product Information</MDTypography>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              placeholder={assetNumber.placeholder}
              type={assetNumber.type}
              name={assetNumber.name}
              label={assetNumber.label}
              value={assetNumberV}
              error={errors.assetNumber && touched.assetNumber}
              success={assetNumberV.length > 0 && !errors.assetNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              placeholder={assetName.placeholder}
              type={assetName.type}
              name={assetName.name}
              label={assetName.label}
              value={assetNameV}
              error={errors.assetName && touched.assetName}
              success={assetNameV.length > 0 && !errors.assetName}
            />
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              placeholder={status.placeholder}
              type={status.type}
              name={status.name}
              label={status.label}
              value={statusV}
              error={errors.status && touched.status}
              success={statusV.length > 0 && !errors.status}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              placeholder={assetLocation.placeholder}
              type={assetLocation.type}
              name={assetLocation.name}
              label={assetLocation.label}
              value={assetLocationV}
              error={errors.assetLocation && touched.assetLocation}
              success={assetLocationV.length > 0 && !errors.assetLocation}
            />
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              placeholder={assetFunction.placeholder}
              type={assetFunction.type}
              name={assetFunction.name}
              label={assetFunction.label}
              value={assetFunctionV}
              error={errors.assetFunction && touched.assetFunction}
              success={assetFunctionV.length > 0 && !errors.assetFunction}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              placeholder={process.placeholder}
              type={process.type}
              name={process.name}
              label={process.label}
              value={processV}
              error={errors.process && touched.process}
              success={processV.length > 0 && !errors.process}
            />
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              placeholder={output.placeholder}
              type={output.type}
              name={output.name}
              label={output.label}
              value={outputV}
              error={errors.output && touched.output}
              success={outputV.length > 0 && !errors.output}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              placeholder={lastPoPrice.placeholder}
              type={lastPoPrice.type}
              name={lastPoPrice.name}
              label={lastPoPrice.label}
              value={lastPoPriceV}
              error={errors.lastPoPrice && touched.lastPoPrice}
              success={lastPoPriceV > 0 && !errors.lastPoPrice}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for Assetinfo
AssetInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default AssetInfo;
