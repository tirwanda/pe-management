// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import TableCell from "@mui/material/TableCell";

// Material Dashboard 2 PRO React components
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

function SalesTableCell({ title, content, image, noBorder, ...rest }) {
  let template;

  if (image) {
    template = (
      <TableCell {...rest} align="left" width="30%" sx={{ border: noBorder && 0 }}>
        <MDBox display="flex" alignItems="center" width="max-content">
          <MDBox component="img" src={image} alt={content} width="1.5rem" height="auto" />{" "}
          <MDBox display="flex" flexDirection="column" ml={3}>
            <MDTypography
              variant="caption"
              color="text"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {title}:
            </MDTypography>
            <MDTypography variant="button" fontWeight="regular" textTransform="capitalize">
              {content}
            </MDTypography>
          </MDBox>
        </MDBox>
      </TableCell>
    );
  } else {
    template = (
      <TableCell {...rest} align="center" sx={{ border: noBorder && 0 }}>
        <MDBox display="flex" flexDirection="column">
          <MDTypography
            variant="caption"
            color="text"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {title}:
          </MDTypography>
          <MDTypography variant="button" fontWeight="regular" textTransform="capitalize">
            {content}
          </MDTypography>
        </MDBox>
      </TableCell>
    );
  }

  return template;
}

// Setting default values for the props of SalesTableCell
SalesTableCell.defaultProps = {
  image: "",
  noBorder: false,
};

// Typechecking props for the SalesTableCell
SalesTableCell.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  noBorder: PropTypes.bool,
};

export default SalesTableCell;
