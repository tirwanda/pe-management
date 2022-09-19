// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Images
import bgImage from "assets/images/bg-player.jpeg";

function MediaPlayer() {
  const mediaPlayerButtonStyles = ({ functions: { pxToRem } }) => ({
    width: pxToRem(46),
    height: pxToRem(46),
    minWidth: pxToRem(46),
    minHeight: pxToRem(46),
    mr: 1,
  });

  return (
    <Card
      sx={({ functions: { linearGradient, rgba }, palette: { gradients } }) => ({
        backgroundImage: `${linearGradient(
          rgba(gradients.dark.main, 0.85),
          rgba(gradients.dark.state, 0.85)
        )}, url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      })}
    >
      <MDBox p={3} position="relative" lineHeight={0}>
        <MDTypography variant="h5" color="white" fontWeight="medium">
          Some Kind Of Blues
        </MDTypography>
        <MDTypography variant="button" color="white">
          Deftones
        </MDTypography>
        <MDBox display="flex" mt={3} pt={1}>
          <MDBox display="flex" alignItems="center" justifyContent="center">
            <MDButton
              variant="outlined"
              size="large"
              circular
              iconOnly
              sx={mediaPlayerButtonStyles}
            >
              <Icon>skip_previous</Icon>
            </MDButton>
            <MDButton
              variant="outlined"
              size="large"
              circular
              iconOnly
              sx={mediaPlayerButtonStyles}
            >
              <Icon>play_arrow</Icon>
            </MDButton>
            <MDButton
              variant="outlined"
              size="large"
              circular
              iconOnly
              sx={mediaPlayerButtonStyles}
            >
              <Icon>skip_next</Icon>
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default MediaPlayer;
