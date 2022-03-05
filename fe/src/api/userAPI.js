import axios from "axios";

const getToken = () => localStorage.getItem("USER_KEY");

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

export const updateUser = (userData) =>
  axios({
    method: "PUT",
    url: `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/user/update`,
    data: userData,
    config,
  });
