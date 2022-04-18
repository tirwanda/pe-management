import { axiosJWT } from "./authAPI";

const getToken = () => localStorage.getItem("ACCESS_TOKEN");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
};

export const updatePart = (partData) =>
  axiosJWT.put(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/part/update`,
    partData,
    config
  );

export const removePartFromAsset = (data) => {
  axiosJWT.delete(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/part/remove-part-from-asset`,
    data,
    config
  );
};
