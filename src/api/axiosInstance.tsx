import { isExcluded } from "@/constants/excludeRoles";
import { RefreshToken } from "@/features/auth/authApi";
import { logout } from "@/features/auth/authSlice";
import type { AppDispatch } from "@/store";
import {
  getAccessToken,
  removeTokens,
  setAccessToken,
  setRefreshToken,
  setRefreshTokenExpirationDate,
} from "@/utils/gitAccessToken";
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
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

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

// handle refresh token

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: AxiosError | null) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
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
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token: string) => {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                resolve(axiosInstance(originalRequest));
              },
              reject,
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const response = await RefreshToken();
          const newToken = response.data.accessToken;

          setAccessToken(newToken);
          setRefreshToken(response.data.refreshToken.refreshToken);
          setRefreshTokenExpirationDate(
            response.data.refreshToken.expirationDate.toString()
          );

          processQueue(null, newToken);

          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          let axiosError: AxiosError | null = null;
          if (axios.isAxiosError(err)) axiosError = err;

          processQueue(axiosError, null);
          removeTokens();
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
