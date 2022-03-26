// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDEditor from "components/MDEditor";
import MDInput from "components/MDInput";

// NewProduct page components
import FormField from "layouts/maintain/assets/new-product/components/FormField";

function LineInfo({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { lineName, lineCode, description, category, cycleTime } = formField;
  const {
    lineName: lineNameV,
    lineCode: lineCodeV,
    description: descriptionV,
    category: categoryV,
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
              label={lineName.lable || ""}
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
              label={lineCode.lable || ""}
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
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Description&nbsp;&nbsp;
                <MDTypography variant="caption" color="text">
                  (optional)
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDEditor
              placeholder={description.placeholder}
              type={description.type}
              label={description.lable || ""}
              name={description.name}
              value={descriptionV}
              error={errors.description && touched.description}
              success={descriptionV.length > 0 && !errors.description}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDBox mb={3}>
              <MDBox mb={2} display="inline-block">
                <MDTypography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  textTransform="capitalize"
                >
                  Category
                </MDTypography>
              </MDBox>
              <Autocomplete
                defaultValue="Sport"
                options={["Sport", "Matic", "Super Sport", "Big Bike"]}
                renderInput={(params) => <MDInput {...params} variant="standard" />}
                type={category.type}
                value={categoryV}
                placeholder={category.placeholder}
                name={category.name}
                error={errors.category && touched.category}
                success={categoryV.length > 0 && !errors.category}
              />
            </MDBox>
            <Grid item xs={12} sm={6}>
              <FormField
                type={cycleTime.type}
                placeholder={cycleTime.placeholder}
                name={cycleTime.name}
                label={cycleTime.lable || ""}
                value={cycleTimeV}
                error={errors.cycleTime && touched.cycleTime}
                success={cycleTimeV.length > 0 && !errors.cycleTime}
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
