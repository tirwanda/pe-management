import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Authentication layout components
import MeduimCoverLayout from "layouts/authentication/components/MediumCoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import UserData from "layouts/authentication/sign-up/Validate/UserData";

// Formik
import { Form, Formik } from "formik";

// NewUser layout schemas for form and form feilds
import validations from "layouts/authentication/sign-up/Validate/schema/validations";
import signUpForm from "layouts/authentication/sign-up/Validate/schema/signUpForm";
import initialValues from "layouts/authentication/sign-up/Validate/schema/initialValues";
import MDTypography from "components/MDTypography";
import { Link } from "react-router-dom";

function getSteps() {
  return ["User Info"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <UserData formData={formData} />;
    default:
      return null;
  }
}

function RegisterStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = signUpForm;
  const currentValidation = validations;
  const isLastStep = activeStep === steps.length - 1;

  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  const handleBack = () => setActiveStep(activeStep - 1);

  const submitForm = async (values, actions) => {
    await sleep(1000);

    // eslint-disable-next-line no-alert
    alert(JSON.stringify(values, null, 2));

    actions.setSubmitting(false);
    actions.resetForm();

    setActiveStep(0);
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  return (
    <MeduimCoverLayout image={bgImage}>
      <MDBox py={3} mb={20} height="65vh" width="80vw">
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%", mt: 8 }}>
          <Grid item xs={12} lg={8}>
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting }) => (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ height: "100%" }}>
                    <MDBox
                      variant="gradient"
                      bgColor="info"
                      borderRadius="lg"
                      coloredShadow="success"
                      mx={2}
                      mt={-3}
                      p={3}
                      mb={1}
                      textAlign="center"
                    >
                      <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                        Join us today
                      </MDTypography>
                      <MDTypography display="block" variant="button" color="white" my={1}>
                        Enter your Information to register
                      </MDTypography>
                    </MDBox>
                    <MDBox p={3}>
                      <MDBox>
                        {getStepContent(activeStep, {
                          values,
                          touched,
                          formField,
                          errors,
                        })}
                        <MDBox mt={3} mb={1} textAlign="center">
                          <MDTypography variant="button" color="text">
                            Already have an account?{" "}
                            <MDTypography
                              component={Link}
                              to="/sign-in"
                              variant="button"
                              color="info"
                              fontWeight="medium"
                              textGradient
                            >
                              Sign In
                            </MDTypography>
                          </MDTypography>
                        </MDBox>
                        <MDBox mt={2} width="100%" display="flex" justifyContent="space-between">
                          {activeStep === 0 ? (
                            <MDBox />
                          ) : (
                            <MDButton variant="gradient" color="light" onClick={handleBack}>
                              back
                            </MDButton>
                          )}
                          <MDButton
                            disabled={isSubmitting}
                            type="submit"
                            variant="gradient"
                            color="dark"
                          >
                            {isLastStep ? "Sign Up" : "next"}
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </MDBox>
    </MeduimCoverLayout>
  );
}

export default RegisterStepper;
