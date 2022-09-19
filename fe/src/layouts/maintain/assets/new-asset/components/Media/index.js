import { useMemo } from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDDropzone from "components/MDDropzone";

function Media() {
  return (
    <MDBox>
      <MDTypography variant="h5">Media</MDTypography>
      <MDBox mt={3}>
        <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
          <MDTypography component="label" variant="button" fontWeight="regular" color="text">
            Product Image
          </MDTypography>
        </MDBox>
        {useMemo(
          () => (
            <MDDropzone options={{ addRemoveLinks: true }} />
          ),
          []
        )}
      </MDBox>
    </MDBox>
  );
}

export default Media;
