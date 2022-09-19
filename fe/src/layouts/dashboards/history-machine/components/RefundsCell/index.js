// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function RefundsCell({ value, icon }) {
  return (
    <MDBox display="flex" justifyContent="center" alignItems="center" px={2}>
      <MDTypography variant="button" fontWeight="regular" color="text">
        {value}
      </MDTypography>
      <MDBox color={icon.color} lineHeight={0}>
        <Icon sx={{ fontWeight: "bold" }} fontSize="small">
          {icon.name}
        </Icon>
      </MDBox>
    </MDBox>
  );
}

// Typechecking props for the RefundsCell
RefundsCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["info", "success", "warning", "error"]).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default RefundsCell;
