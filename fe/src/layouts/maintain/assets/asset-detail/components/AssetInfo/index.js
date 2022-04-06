import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// @mui material components

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

function AssetInfo({ assetInfo }) {
  const [data, setData] = useState(assetInfo);

  useEffect(() => {
    setData(assetInfo);
  }, [assetInfo]);

  return (
    <MDBox>
      <MDBox mb={1}>
        <MDTypography variant="h4" fontWeight="bold">
          {data.assetName || "Machine Name"}
        </MDTypography>
      </MDBox>
      <MDBox mt={1}>
        <MDTypography variant="h6" fontWeight="medium">
          Price
        </MDTypography>
      </MDBox>
      <MDBox mb={1}>
        <MDTypography variant="h5" fontWeight="medium">
          IDR {data.lastPoPrice || "0"}
        </MDTypography>
      </MDBox>
      <MDBadge variant="contained" color="success" badgeContent="Running" container />
    </MDBox>
  );
}

AssetInfo.defaultProps = {
  assetInfo: {},
};

AssetInfo.propTypes = {
  assetInfo: PropTypes.shape({
    assetId: PropTypes.number,
    assetNumber: PropTypes.string,
    assetName: PropTypes.string,
    status: PropTypes.string,
    assetLocation: PropTypes.string,
    assetFunction: PropTypes.string,
    process: PropTypes.string,
    output: PropTypes.string,
    lastPoPrice: PropTypes.number,
  }),
};

export default AssetInfo;
