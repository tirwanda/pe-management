// import axios from "axios";
import { axiosJWT } from "./authAPI";

const getToken = () => localStorage.getItem("ACCESS_TOKEN");

export const getAllDowntime = () =>
  axiosJWT({
    method: "GET",
    url: `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/downtime`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const saveDowntime = (downtimeData) =>
  axiosJWT.post(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/downtime/save`,
    downtimeData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const getDowntimeById = (downtimeId) =>
  axiosJWT({
    method: "GET",
    url: `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/downtime/${downtimeId}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const updateDowntime = (downtimeData) =>
  axiosJWT.put(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/downtime/update`,
    downtimeData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const approvalDowntime = (downtimeData) =>
  axiosJWT.put(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/downtime/approval`,
    downtimeData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const deleteDowntime = (downtimeId) =>
  axiosJWT({
    method: "delete",
    url: `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/downtime/${downtimeId}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
