import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://ilink.runasp.net/Api/V1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
