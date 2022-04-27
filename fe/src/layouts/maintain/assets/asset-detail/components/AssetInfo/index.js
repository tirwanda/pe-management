import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// @mui material components
import { Divider, Grid } from "@mui/material";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import AssetInfoCard from "examples/Cards/InfoCards/AssetInfoCard";

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
      <Grid item xs={12} md={12} xl={12} sx={{ display: "flex" }}>
        <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
        <AssetInfoCard
          title="Asset information"
          info={{
            fullName: `${data.assetName}`,
            assetNumber: `${data.assetNumber}`,
            status: `${data.status}`,
            location: `${data.assetLocation}`,
          }}
          action={{ route: `/asset/edit/${data.assetNumber}`, tooltip: "Edit Profile" }}
          shadow={false}
        />
      </Grid>
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
