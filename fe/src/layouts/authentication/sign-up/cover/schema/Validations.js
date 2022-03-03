/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import * as Yup from "yup";
import checkout from "layouts/authentication/sign-up/cover/schema/SignUpForm";

const {
  formField: { name, username, nrp, email, password, confirmPassword },
} = checkout;

const validations = Yup.object().shape({
  [name.name]: Yup.string().required(name.errorMsg),
  [username.name]: Yup.string().required(username.errorMsg),
  [nrp.name]: Yup.string().required(nrp.errorMsg).email(nrp.errorMsg),
  [email.name]: Yup.string().required(email.errorMsg).email(email.invalidMsg),
  [password.name]: Yup.string().required(password.errorMsg).min(6, password.invalidMsg),
  [confirmPassword.name]: Yup.string()
    .required(confirmPassword.errorMsg)
    .min(6, password.invalidMsg),
});

export default validations;
