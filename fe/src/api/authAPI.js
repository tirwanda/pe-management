import axios from "axios";
import jwtDecode from "jwt-decode";

const configHeaders = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
  async (res) => {
    const currentDate = new Date();
    const expire = localStorage.getItem("EXPIRES_IN");

    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get(
        `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/token/refresh`
      );
      res.headers.Authorization = `Bearer ${response.data.access_token}`;
      localStorage.setItem("ACCESS_TOKEN", response.data.access_token);
      const decode = jwtDecode(response.data.access_token);
      localStorage.setItem("EXPIRES_IN", decode.exp);
      localStorage.setItem("USERNAME", decode.username);
    }

    return res;
  },
  (error) => Promise.reject(error)
);

export const userLogin = (userData) =>
  axios.post(
    `${process.env.REACT_APP_HOST_URL || "http://localhost:8080"}/api/login`,
    userData,
    configHeaders
  );
