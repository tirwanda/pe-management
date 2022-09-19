// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function IdCell({ id, checked }) {
  return (
    <MDBox display="flex" alignItems="center">
      <Checkbox defaultChecked={checked} />
      <MDBox ml={1}>
        <MDTypography variant="caption" fontWeight="medium" color="text">
          {id}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Setting default value for the props of IdCell
IdCell.defaultProps = {
  checked: false,
};

// Typechecking props for the IdCell
IdCell.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default IdCell;
