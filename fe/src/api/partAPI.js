// import axios from "axios";
import { axiosJWT } from "./authAPI";

const getToken = () => localStorage.getItem("ACCESS_TOKEN");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
};

export const savePart = (partData) =>
  axiosJWT.post(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/part/save`,
    partData,
    config
  );

export const getPartListByAssetNumber = (assetNumber) =>
  axiosJWT({
    method: "GET",
    url: `${
      process.env.REACT_APP_HOST_URL || "http://localhost:8080"
    }/api/part/by-asset/${assetNumber}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const updatePart = (partData) =>
  axiosJWT.put(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/part/update`,
    partData,
    config
  );

export const removePartFromAsset = (assetNumber, partNumber) => {
  axiosJWT.delete(
    `${
      process.env.REACT_APP_HOST_URL || "http://localhost:8080"
    }/api/part/${assetNumber}/remove/${partNumber}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};
