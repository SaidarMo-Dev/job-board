import { getAccessToken } from "@/utils/gitAccessToken";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7235/Api/V1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.defaults.headers.common[
  "Authorization"
] = `bearer ${getAccessToken()}`;
axiosInstance.defaults.timeout = 5000;

export default axiosInstance;
