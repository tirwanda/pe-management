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

export const getLineChartDowntime = () =>
  axiosJWT({
    method: "GET",
    url: `${
      process.env.REACT_APP_HOST_URL || "http://localhost:8080"
    }/api/dashboard/line-chart-downtime`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getTopDowntimeData = () =>
  axiosJWT({
    method: "GET",
    url: `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/dashboard/top-downtime`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
