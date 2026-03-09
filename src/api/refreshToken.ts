import { logout } from "@/features/auth/authSlice";
import type { AppDispatch } from "@/store";
import axiosInstance from "./axiosInstance";
import { AxiosError, type AxiosRequestConfig } from "axios";

/**
 * Interface for failed request queue items.
 */
interface FailedRequest {
  resolve: (value?: unknown) => void;
  reject: (err: AxiosError | null) => void;
}

/**
 * Extended AxiosRequestConfig with retry flag.
 */
interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

// Refresh state
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

/**
 * Processes the queue of failed requests after refresh attempt.
 */
const processQueue = (error: AxiosError | null): void => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });
  failedQueue = [];
};

/**
 * Sets up response interceptors for handling token refresh.
 */

export const setupAxiosInterceptors = (dispatch: AppDispatch): void => {
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfigWithRetry;

      // Check if the error is 401 AND it's not a refresh request already
      const isRefreshRequest = originalRequest.url?.includes(
        "/auth/refresh-token",
      );

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !isRefreshRequest
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: () => resolve(axiosInstance(originalRequest)),
              reject: (err) => reject(err), // Ensure rejection is passed back
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          await axiosInstance.post("/auth/refresh-token");
          processQueue(null);
          return axiosInstance(originalRequest);
        } catch (err) {
          processQueue(err as AxiosError);
          dispatch(logout());
          // Ensure we reject here so the Thunk hits .rejected
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      // If it's a 401 on a REFRESH request, logout immediately and reject
      if (isRefreshRequest && error.response?.status === 401) {
        dispatch(logout());
        return Promise.reject(error);
      }

      return Promise.reject(error);
    },
  );
};
