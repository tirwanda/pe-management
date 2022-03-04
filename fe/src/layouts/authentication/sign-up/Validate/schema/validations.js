import * as Yup from "yup";
import checkout from "layouts/authentication/sign-up/Validate/schema/signUpForm";

const {
  formField: { name, username, nrp, email, password, confirmPassword },
} = checkout;

const validations = Yup.object().shape({
  [name.name]: Yup.string().required(name.errorMsg),
  [username.name]: Yup.string().required(username.errorMsg),
  [nrp.name]: Yup.string().required(nrp.errorMsg).type(nrp.type),
  [email.name]: Yup.string().required(email.errorMsg).email(email.invalidMsg),
  [password.name]: Yup.string().required(password.errorMsg).min(6, password.invalidMsg),
  [confirmPassword.name]: Yup.string()
    .required(confirmPassword.errorMsg)
    .min(6, password.invalidMsg),
});

export default validations;
