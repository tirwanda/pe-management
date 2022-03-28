import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// NewProduct page components
import { saveLine } from "api/lineAPI";
import MDSnackbar from "components/MDSnackbar";

import { Form, Formik } from "formik";
import initialValues from "layouts/dashboards/create-new-line/schema/initialValues";
import LineInfo from "./components/LineInfo";
import newLineForm from "./schema/newLineForm";
import validations from "./schema/validations";

function getSteps() {
  return ["Line Info"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <LineInfo formData={formData} />;
    default:
      return null;
  }
}

function NewLine() {
  const [activeStep, setActiveStep] = useState(0);
  const [successSB, setSuccesSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [message, setMessage] = useState("");
  const steps = getSteps();
  const { formId, formField } = newLineForm;
  const currentValidation = validations;
  const isLastStep = activeStep === steps.length - 1;

  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  const openSuccessSB = (data) => {
    setSuccesSB(true);
    setMessage(data);
  };
  const closeSuccessSB = () => setSuccesSB(false);
  const openErrorSB = (data) => {
    setErrorSB(true);
    setMessage(data);
  };
  const closeErrorSB = () => setErrorSB(false);

  const submitForm = async (values, actions) => {
    await sleep(1000);
    saveLine(values)
      .then((response) => openSuccessSB(response.data.payload.lineCode))
      .catch((error) => {
        if (error.response) {
          openErrorSB(error.response.data.message);
        } else {
          openErrorSB("Network Error");
        }
      });

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

  const handleBack = () => setActiveStep(activeStep - 1);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Successfully save data"
      content={`Congratulations, you have successfully created a user with the username ${message}`}
      dateTime="A few seconds ago"
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
      title="Failed to create user"
      content={message}
      dateTime="A few secons ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={5} mb={9}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
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
                          Add New Line
                        </MDTypography>
                        <MDTypography display="block" variant="button" color="white" my={1}>
                          This information will describe more about the Line Production.
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
                              {isLastStep ? "Submit" : "next"}
                            </MDButton>
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </Card>
                  </Form>
                )}
              </Formik>
            </Card>
          </Grid>
        </Grid>
        {renderSuccessSB}
        {renderErrorSB}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default NewLine;
