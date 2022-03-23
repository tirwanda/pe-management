import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Settings page components
import FormField from "layouts/pages/account/components/FormField";

// Data
import { updateUser } from "api/userAPI";
import { setUser, useMaterialUIController } from "context";

function BasicInfo({ profile }) {
  const [data, setData] = useState(profile);
  const [, dispatch] = useMaterialUIController();

  // const navigate = useNavigate();

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log("Data: ", data);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    // updateUser(data)
    //   .then((response) => {
    //     setUser(dispatch, response.data.payload);
    //     console.log("Response: ", response.data.payload);
    //   })
    //   .catch((error) => {
    //     console.log("Error: ", error);
    //   });
    try {
      const response = await updateUser(data);
      setUser(dispatch, response.data.payload);
      console.log("Response: ", response.data.payload);
    } catch (error) {
      console.log("Error: ", error);
      // navigate("/sign-in");
    }
  };

  useEffect(() => {
    setData(profile);
  }, [profile]);

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
