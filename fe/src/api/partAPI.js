import axios from "axios";
import { axiosJWT } from "./authAPI";

const getToken = () => localStorage.getItem("ACCESS_TOKEN");

export const savePartAddToAsset = (partData) =>
  axios.post(
    `${
      process.env.REACT_APP_HOST_URL || "http://localhost:8080"
    }/api/part/create-and-save-to-asset`,
    partData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
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

export const getAllPartsNotInAsset = (data) =>
  axiosJWT.get(`http://localhost:8080/api/part/not-in-asset/${data}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

export const updatePart = (partData) =>
  axiosJWT.put(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/part/update`,
    partData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

export const removePartFromAsset = (assetNumber, partNumber) =>
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

export const addPartToAsset = (data) =>
  axiosJWT.post(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/part/add-part-to-asset`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
