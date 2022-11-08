import { axiosJWT } from "./authAPI";

const getToken = () => localStorage.getItem("ACCESS_TOKEN");

export const getAllReportDowntime = () =>
  axiosJWT({
    method: "GET",
    url: `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/report-downtime/all`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getAllReportDowntimeByDate = (requestData) =>
  axiosJWT.post(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/report-downtime`,
    requestData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
