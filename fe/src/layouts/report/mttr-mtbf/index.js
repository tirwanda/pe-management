/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import dataTableData from "layouts/report/mttr-mtbf/data/dataTableData";
import MDTypography from "components/MDTypography";
import { getAllReportDowntimeByDate } from "api/reportDowntime";

function ReportDowntime() {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const yearList = [
    new Date().getFullYear(),
    new Date().getFullYear() - 1,
    new Date().getFullYear() - 2,
    new Date().getFullYear() - 3,
    new Date().getFullYear() - 4,
  ];

  const [reportDowntime, setReportDowntime] = useState([]);

  const [menuMonth, setMenuMonth] = useState(null);
  const [searchMonth, setSearchMonth] = useState(monthNames[new Date().getMonth()]);

  const openMenuMonth = (event) => setMenuMonth(event.currentTarget);
  const closeMenuMonth = () => setMenuMonth(null);

  const [menuYear, setMenuYear] = useState(null);
  const [searchYear, setSearchYear] = useState(new Date().getFullYear());

  const openMenuYear = (event) => setMenuYear(event.currentTarget);
  const closeMenuYear = () => setMenuYear(null);

  const renderMenuMonth = (
    <Menu
      anchorEl={menuMonth}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menuMonth)}
      onClose={closeMenuMonth}
      keepMounted
    >
      {monthNames.map((month) => (
        <MenuItem
          onClick={() => {
            closeMenuMonth();
            setSearchMonth(month);
          }}
          key={month}
        >
          {month}
        </MenuItem>
      ))}
    </Menu>
  );

  const getReportDowntimeData = (month, year) => {
    const dateObject = {
      date: `${month}, ${year}`,
    };

    getAllReportDowntimeByDate(dateObject).then((res) => {
      setReportDowntime(res.data.payload);
    });
  };

  useEffect(() => {
    getReportDowntimeData(searchMonth, searchYear);
  }, []);

  useEffect(() => {
    getReportDowntimeData(searchMonth, searchYear);
  }, [searchMonth, searchYear]);

  const renderMenuYear = (
    <Menu
      anchorEl={menuYear}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menuYear)}
      onClose={closeMenuYear}
      keepMounted
    >
      {yearList.map((year) => (
        <MenuItem
          onClick={() => {
            closeMenuYear();
            setSearchYear(year);
          }}
          key={year}
        >
          {year}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={5}>
          <MDBox display="flex">
            <MDButton
              variant={menuMonth ? "contained" : "outlined"}
              color="dark"
              onClick={openMenuMonth}
              style={{
                marginRight: "10px",
              }}
            >
              {searchMonth}
              <Icon>keyboard_arrow_down</Icon>
            </MDButton>
            {renderMenuMonth}
            <MDButton
              variant={menuYear ? "contained" : "outlined"}
              color="dark"
              onClick={openMenuYear}
            >
              {searchYear}
              <Icon>keyboard_arrow_down</Icon>
            </MDButton>
            {renderMenuYear}
          </MDBox>
        </MDBox>
        {reportDowntime.map((report, index) => (
          <MDBox mb={3} key={index}>
            <Card>
              <MDBox p={3} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                  Line Name : {report.lineName}
                </MDTypography>
                <MDTypography variant="button" color="text">
                  Date : {`${searchMonth}, ${searchYear}`}
                </MDTypography>
              </MDBox>
              <DataTable table={{ ...dataTableData, rows: report.downtimes }} canSearch />
            </Card>
          </MDBox>
        ))}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ReportDowntime;
