import { ACCESS_TOKEN_KEY } from "@/utils/constans";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7235/Api/V1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.defaults.headers.common["Authorization"] =
  localStorage.getItem(ACCESS_TOKEN_KEY);
axiosInstance.defaults.timeout = 3000;

export default axiosInstance;
