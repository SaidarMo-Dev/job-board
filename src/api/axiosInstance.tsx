import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7235/Api/V1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
