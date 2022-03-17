import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { userLogin } from "api/authAPI";

import qs from "query-string";
import MDSnackbar from "components/MDSnackbar";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [errorSB, setErrorSB] = useState(false);

  const initialState = {
    username: "",
    password: "",
  };
  const [data, setData] = useState(initialState);
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const closeErrorSB = () => setErrorSB(false);
  const openErrorSB = (errorMessage) => {
    setErrorSB(true);
    setMessage(errorMessage);
  };

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    await userLogin(qs.stringify(data))
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("ACCESS_TOKEN", response.data.access_token);
          localStorage.setItem("REFRESH_TOKEN", response.data.refresh_token);
          localStorage.setItem("USERNAME", response.data.username);

          navigate("/dashboards/history-machine");
        }
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              openErrorSB(err.response.data.error_message);
              break;
            case 401:
              openErrorSB("Authentication Failed.Bad Credentials");
              break;
            default:
              openErrorSB("Something Wrong!Please Try Again");
          }
        } else {
          openErrorSB("Something Wrong!Please Try Again");
        }
      });
  };

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Sign In Failed"
      content={message}
      dateTime="1 sec ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={1}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your username and password to sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                value={data.username}
                name="username"
                type="username"
                label="Username"
                onChange={handleInputChange}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                value={data.password}
                name="password"
                type="password"
                label="Password"
                onChange={handleInputChange}
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleLogin} fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      {renderErrorSB}
    </BasicLayout>
  );
}

export default Basic;
