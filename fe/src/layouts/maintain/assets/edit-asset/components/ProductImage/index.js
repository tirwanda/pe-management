import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Images
import productImage from "assets/images/products/product-11.jpg";

function ProductImage({ assetName }) {
  return (
    <Card
      sx={{
        "&:hover .card-header": {
          transform: "translate3d(0, -50px, 0)",
        },
      }}
    >
      <MDBox
        position="relative"
        borderRadius="lg"
        mt={-3}
        mx={2}
        className="card-header"
        sx={{ transition: "transform 300ms cubic-bezier(0.34, 1.61, 0.7, 1)" }}
      >
        <MDBox
          component="img"
          src={productImage}
          alt="Product Image"
          borderRadius="lg"
          shadow="sm"
          width="100%"
          height="100%"
          position="relative"
          zIndex={10}
          mb={2}
        />
      </MDBox>
      <MDBox textAlign="center" pt={2} pb={3} px={3}>
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={-10}
          position="relative"
          zIndex={1}
        >
          <MDBox mr={1}>
            <MDButton variant="gradient" color="info" size="small">
              edit
            </MDButton>
          </MDBox>
          <MDButton variant="outlined" color="dark" size="small">
            remove
          </MDButton>
        </MDBox>
        <MDTypography variant="h5" fontWeight="regular" sx={{ mt: 4 }}>
          {assetName || ""}
        </MDTypography>
      </MDBox>
    </Card>
  );
}

ProductImage.defaultProps = {
  assetName: "Machine Image",
};

ProductImage.propTypes = {
  assetName: PropTypes.string,
};

export default ProductImage;
