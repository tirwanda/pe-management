// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// NewUser page components
import FormField from "layouts/pages/users/new-user/components/FormField";

function UserData({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { name, username, nrp, email, password, confirmPassword } = formField;
  const {
    name: nameV,
    username: usernameV,
    nrp: nrpV,
    email: emailV,
    password: passwordV,
    confirmPassword: confirmPasswordV,
  } = values;

  return (
    <MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={name.type}
              label={name.label}
              name={name.name}
              value={nameV}
              placeholder={name.placeholder}
              error={errors.name && touched.name}
              success={nameV.length > 0 && !errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={username.type}
              label={username.label}
              name={username.name}
              value={usernameV}
              placeholder={username.placeholder}
              error={errors.username && touched.username}
              success={usernameV.length > 0 && !errors.username}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={nrp.type}
              label={nrp.label}
              name={nrp.name}
              value={nrpV}
              placeholder={nrp.placeholder}
              error={errors.nrp && touched.nrp}
              success={nrpV.length > 0 && !errors.nrp}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={email.type}
              label={email.label}
              name={email.name}
              value={emailV}
              placeholder={email.placeholder}
              error={errors.email && touched.email}
              success={emailV.length > 0 && !errors.email}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={password.type}
              label={password.label}
              name={password.name}
              value={passwordV}
              placeholder={password.placeholder}
              error={errors.password && touched.password}
              success={passwordV.length > 0 && !errors.password}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={confirmPassword.type}
              label={confirmPassword.label}
              name={confirmPassword.name}
              value={confirmPasswordV}
              placeholder={confirmPassword.placeholder}
              error={errors.confirmPassword && touched.confirmPassword}
              success={confirmPasswordV.length > 0 && !errors.confirmPassword}
              inputProps={{ autoComplete: "" }}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserData
UserData.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default UserData;
