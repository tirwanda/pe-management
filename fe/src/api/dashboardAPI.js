import { axiosJWT } from "./authAPI";

const getToken = () => localStorage.getItem("ACCESS_TOKEN");
const getUsername = () => localStorage.getItem("USERNAME");

export const getPieChartAssetData = () =>
  axiosJWT({
    method: "GET",
    url: `${
      process.env.REACT_APP_HOST_URL || "http://localhost:8080"
    }/api/dashboard/pie-chart-asset/${getUsername()}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getDowntimeChartData = () => {};
