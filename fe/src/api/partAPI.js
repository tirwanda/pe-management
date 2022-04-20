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

export const removePartFromAsset = (partData) => {
  console.log("Data: ", partData);
  axiosJWT.put(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/part/remove-part-from-asset`,
    partData,
    config
  );
};

// export const removePartFromAsset = (value) => {
//   console.log("Data: ", value);
//   axios.delete(
//     `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/part/remove-part-from-asset`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getToken()}`,
//       },
//       data: { value },
//     }
//   );
// };
