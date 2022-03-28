// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// NewProduct page components
import FormField from "layouts/dashboards/create-new-line/components/FormField";

function LineInfo({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { lineName, lineCode, description, cycleTime } = formField;
  const {
    lineName: lineNameV,
    lineCode: lineCodeV,
    description: descriptionV,
    cycleTime: cycleTimeV,
  } = values;

  return (
    <MDBox>
      <MDTypography variant="h5">Line Information</MDTypography>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              placeholder={lineName.placeholder}
              type={lineName.type}
              name={lineName.name}
              label={lineName.label}
              value={lineNameV}
              error={errors.lineName && touched.lineName}
              success={lineNameV.length > 0 && !errors.lineName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              placeholder={lineCode.placeholder}
              type={lineCode.type}
              name={lineCode.name}
              label={lineCode.label}
              value={lineCodeV}
              error={errors.lineCode && touched.lineCode}
              success={lineCodeV.length > 0 && !errors.lineCode}
            />
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              name={description.name}
              label={description.label}
              placeholder={description.placeholder}
              multiline
              rows={5}
              value={descriptionV}
              error={errors.description && touched.description}
              success={descriptionV.length > 0 && !errors.description}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={6}>
              <FormField
                type={cycleTime.type}
                placeholder={cycleTime.placeholder}
                name={cycleTime.name}
                label={cycleTime.label}
                value={cycleTimeV}
                error={errors.cycleTime && touched.cycleTime}
                success={cycleTimeV > 0 && !errors.cycleTime}
              />
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for LineInfo
LineInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default LineInfo;
