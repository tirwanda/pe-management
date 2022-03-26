import axios from "axios";
import { axiosJWT } from "./authAPI";

const getToken = () => localStorage.getItem("ACCESS_TOKEN");
const getUsername = () => localStorage.getItem("USERNAME");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
};

export const saveLine = (lineData) =>
  axiosJWT({
    method: "POST",
    url: `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/line/save`,
    data: lineData,
    config,
  });

export const updateLine = (lineData) =>
  axiosJWT.put(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/user/update`,
    lineData,
    config
  );
