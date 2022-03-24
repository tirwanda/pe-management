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

export const saveUser = (userData) =>
  axios({
    method: "POST",
    url: `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/user/save`,
    data: userData,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getUserData = () =>
  axiosJWT({
    method: "GET",
    url: `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/user/${getUsername()}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getProfileData = () =>
  axiosJWT({
    method: "GET",
    url: `${
      process.env.REACT_APP_HOST_URL || "http://localhost:8080"
    }/api/user/profile/${getUsername()}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const updateUser = (userData) =>
  axiosJWT.put(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/user/update`,
    userData,
    config
  );
