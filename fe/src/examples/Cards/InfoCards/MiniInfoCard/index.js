// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function MiniInfoCard({ color, icon, title, description }) {
  return (
    <Card>
      <MDBox p={3}>
        <MDBox
          display="grid"
          justifyContent="center"
          alignItems="center"
          bgColor={color}
          color="white"
          width="3rem"
          height="3rem"
          shadow="md"
          borderRadius="lg"
          variant="gradient"
        >
          <Icon fontSize="default">{icon}</Icon>
        </MDBox>
        <MDBox mt={2.625}>
          <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize">
            {title}
          </MDTypography>
          <MDTypography variant="body2" color="text" fontWeight="regular">
            {description}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of MiniInfoCard
MiniInfoCard.defaultProps = {
  color: "info",
};

// Typechecking props for the MiniInfoCard
MiniInfoCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
};

export default MiniInfoCard;
