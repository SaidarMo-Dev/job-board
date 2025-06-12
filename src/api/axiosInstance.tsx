import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://ilink.runasp.net/Api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
