// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// OrderDetails page components
import Header from "layouts/maintain/orders/order-details/components/Header";
import OrderInfo from "layouts/maintain/orders/order-details/components/OrderInfo";
import TrackOrder from "layouts/maintain/orders/order-details/components/TrackOrder";
import PaymentDetails from "layouts/maintain/orders/order-details/components/PaymentDetails";
import BillingInformation from "layouts/maintain/orders/order-details/components/BillingInformation";
import OrderSummary from "layouts/maintain/orders/order-details/components/OrderSummary";

function OrderDetails() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={6}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox pt={2} px={2}>
                <Header />
              </MDBox>
              <Divider />
              <MDBox pt={1} pb={3} px={2}>
                <MDBox mb={3}>
                  <OrderInfo />
                </MDBox>
                <Divider />
                <MDBox mt={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                      <TrackOrder />
                    </Grid>
                    <Grid item xs={12} md={6} lg={5}>
                      <PaymentDetails />
                      <MDBox mt={3}>
                        <BillingInformation />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} lg={3} sx={{ ml: "auto" }}>
                      <OrderSummary />
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default OrderDetails;
