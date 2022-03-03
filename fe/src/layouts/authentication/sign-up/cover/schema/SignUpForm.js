const signUpForm = {
  formId: "sign-up-form",
  formField: {
    name: {
      name: "name",
      label: "Name",
      type: "text",
      errorMsg: "Name is required.",
    },
    username: {
      name: "username",
      label: "Username",
      type: "text",
      errorMsg: "Username is required.",
    },
    nrp: {
      name: "nrp",
      label: "NRP",
      type: "number",
      errorMsg: "NRP is required.",
    },
    email: {
      name: "email",
      label: "Email Address",
      type: "email",
      errorMsg: "Email address is required.",
      invalidMsg: "Your email address is invalid",
    },
    password: {
      name: "password",
      label: "Password",
      type: "password",
      errorMsg: "Password is required.",
      invalidMsg: "Your password should be more than 6 characters.",
    },
    confirmPassword: {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      errorMsg: "Password is required.",
      invalidMsg: "Your password doesn't match.",
    },
  },
};

export default signUpForm;
