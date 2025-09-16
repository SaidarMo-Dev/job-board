import { isExcluded } from "@/constants/excludeRoles";
import { logout } from "@/features/auth/authSlice";
import type { AppDispatch } from "@/store";
import { getAccessToken } from "@/utils/gitAccessToken";
import axios, { AxiosError } from "axios";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
});

// Track how many requests are active
let requestCount = 0;

const startProgress = () => {
  if (requestCount === 0) NProgress.start();
  requestCount++;
};

const stopProgress = () => {
  requestCount--;
  if (requestCount <= 0) {
    NProgress.done();
    requestCount = 0;
  }
};

const axiosInstance = axios.create({
  baseURL: "https://localhost:7235/Api/V1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

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

axiosInstance.defaults.headers.common[
  "Authorization"
] = `bearer ${getAccessToken()}`;
axiosInstance.defaults.timeout = 5000;

export default axiosInstance;

// ==================================================
// Refresh handling with pooling
// ==================================================

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (err: AxiosError | null) => void;
}> = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

export const setupAxiosInterceptors = (dispatch: AppDispatch) => {
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // Queue requests until refresh finishes
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: () => resolve(axiosInstance(originalRequest)),
              reject,
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Backend sets new cookies
          await axiosInstance.post("/auth/refresh-token");

          processQueue(null);

          // Retry original request
          return axiosInstance(originalRequest);
        } catch (err) {
          processQueue(err as AxiosError);
          dispatch(logout());
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
