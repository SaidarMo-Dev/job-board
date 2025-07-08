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
import axios from "axios";
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

    startProgress();
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
export const setupAxiosInterceptors = (dispatch: AppDispatch) => {
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await RefreshToken();

          setAccessToken(response.data.accessToken);
          setRefreshToken(response.data.refreshToken.refreshToken);
          setRefreshTokenExpirationDate(
            response.data.refreshToken.expirationDate.toString()
          );

          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
          return axios(originalRequest);
        } catch (err) {
          console.log(err);
          removeTokens();
          dispatch(logout());
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );
};
