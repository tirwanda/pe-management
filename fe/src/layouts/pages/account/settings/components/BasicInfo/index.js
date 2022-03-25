import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Settings page components
import FormField from "layouts/pages/account/components/FormField";

// Data
import { updateUser } from "api/userAPI";
import { setUser, useMaterialUIController } from "context";

function BasicInfo({ profile }) {
  const [data, setData] = useState(profile);
  const [, dispatch] = useMaterialUIController();
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const openSuccessSB = (response) => {
    setSuccessSB(true);
    setMessage(response);
  };

  const closeSuccessSB = () => setSuccessSB(false);

  const openErrorSB = (response) => {
    setErrorSB(true);
    setMessage(response);
  };

  const closeErrorSB = () => setErrorSB(false);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await updateUser(data);
      setUser(dispatch, response.data.payload);
      openSuccessSB(response.data.payload.username);
    } catch (error) {
      if (error.response === 400) {
        openErrorSB(error.response.data.message);
      } else if (error.response === 403) {
        openErrorSB(error.response.data.message);
        navigate("/sign-in");
      } else {
        openErrorSB("Something went wrong");
      }
    }
  };

  useEffect(() => {
    setData(profile);
  }, [profile]);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Successfully updated profile"
      content={`Congratulations, you have successfully updated user profile with the username ${message}`}
      dateTime="2 seconds ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Failed to updating user profile"
      content={message}
      dateTime="2 second ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <MDBox p={3}>
        <MDTypography variant="h5">Basic Info</MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              name="name"
              label="Name"
              placeholder="Name"
              value={data.name || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              name="location"
              label="Location"
              placeholder="Location"
              value={data.location || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              name="email"
              label="Email"
              placeholder="example@email.com"
              inputProps={{ type: "email" }}
              value={data.email || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              name="extension"
              label="Extension"
              placeholder="+40 735 631 620"
              inputProps={{ type: "number" }}
              value={data.extension || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormField
              name="description"
              label="Description"
              placeholder="About me"
              multiline
              rows={5}
              value={data.description || ""}
              onChange={handleInputChange}
            />
          </Grid>
          <MDBox ml="auto" mt={3}>
            <MDButton variant="gradient" color="dark" size="small" onClick={handleUpdate}>
              Update Profile
            </MDButton>
          </MDBox>
        </Grid>
      </MDBox>
      {renderSuccessSB}
      {renderErrorSB}
    </Card>
  );
}

BasicInfo.defaultProps = {
  profile: {},
};

BasicInfo.propTypes = {
  profile: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    email: PropTypes.string,
    extension: PropTypes.number,
    description: PropTypes.string,
  }),
};

export default BasicInfo;
