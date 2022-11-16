import { axiosJWT } from "./authAPI";

const getToken = () => localStorage.getItem("ACCESS_TOKEN");

export const getAllLines = () =>
  axiosJWT({
    method: "GET",
    url: `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/lines`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getAllLinesDetail = () =>
  axiosJWT({
    method: "GET",
    url: `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/lines-detail`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const saveLine = (lineData) =>
  axiosJWT.post(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/line/save-and-add-to-user`,
    lineData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const updateLine = (lineData) =>
  axiosJWT.put(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/user/update`,
    lineData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
