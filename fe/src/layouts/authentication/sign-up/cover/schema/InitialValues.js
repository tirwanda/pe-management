import checkout from "layouts/authentication/sign-up/cover/schema/SignUpForm";

const {
  formField: { name, username, nrp, email, password, confirmPassword },
} = checkout;

const initialValues = {
  [name.name]: "",
  [username.name]: "",
  [nrp.name]: "",
  [email.name]: "",
  [password.name]: "",
  [confirmPassword.name]: "",
};

export default initialValues;
