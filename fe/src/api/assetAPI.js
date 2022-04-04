import { axiosJWT } from "./authAPI";

const getToken = () => localStorage.getItem("ACCESS_TOKEN");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
};

export const saveAsset = (lineData) =>
  axiosJWT.post(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/asset/save`,
    lineData,
    config
  );

export const getLineData = (lineCode) =>
  axiosJWT({
    method: "GET",
    url: `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/line/${lineCode}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const getAssetByAssetNumber = (assetNumber) =>
  axiosJWT({
    method: "GET",
    url: `${
      process.env.REACT_APP_HOST_URL || "http://localhost:8080"
    }/api/asset/asset-no/${assetNumber}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const updateAsset = (assetData) =>
  axiosJWT.put(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/asset/update`,
    assetData,
    config
  );
