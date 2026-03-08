import { BASE_URL, TIMEOUT } from "./constants";
import { startProgress, stopProgress } from "./progress";
import { isExcluded } from "@/constants/excludeRoles";
import { getAccessToken } from "@/utils/gitAccessToken";
import axios from "axios";

/**
 * Configured Axios instance with defaults and progress interceptors.
 */
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Set default headers and timeout
axiosInstance.defaults.headers.common["Authorization"] = `bearer ${getAccessToken()}`;
axiosInstance.defaults.timeout = TIMEOUT;

// Request interceptor for progress tracking
axiosInstance.interceptors.request.use(
  (config) => {
    // Remove query string for comparison
    const url = config.url?.split("?")[0];

    // Start progress only if not excluded
    if (!isExcluded(url)) {
      startProgress();
    }

    return config;
  },
  (error) => {
    stopProgress();
    return Promise.reject(error);
  }
);

// Response interceptor for progress tracking
axiosInstance.interceptors.response.use(
  (response) => {
    stopProgress();
    return response;
  },
  (error) => {
    stopProgress();
    return Promise.reject(error);
  }
);

export default axiosInstance;