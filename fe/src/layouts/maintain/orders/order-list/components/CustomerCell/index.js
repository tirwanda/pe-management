// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

function CustomerCell({ image, name, color }) {
  return (
    <MDBox display="flex" alignItems="center">
      <MDBox mr={1}>
        <MDAvatar bgColor={color} src={image} alt={name} size="xs" />
      </MDBox>
      <MDTypography variant="caption" fontWeight="medium" color="text" sx={{ lineHeight: 0 }}>
        {name}
      </MDTypography>
    </MDBox>
  );
}

// Setting default value for the props of CustomerCell
CustomerCell.defaultProps = {
  image: "",
  color: "dark",
};

// Typechecking props for the CustomerCell
CustomerCell.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    "transparent",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
};

export default CustomerCell;
