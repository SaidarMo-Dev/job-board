import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_EXP_KEY,
  REFRESH_TOKEN_KEY,
} from "./constans";

// get tokens
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const getRefreshTokenExpirationDate = () =>
  localStorage.getItem(REFRESH_TOKEN_EXP_KEY);

// set tokens

export const setAccessToken = (token: string) =>
  localStorage.setItem(ACCESS_TOKEN_KEY, token);

export const setRefreshToken = (token: string) =>
  localStorage.setItem(REFRESH_TOKEN_KEY, token);

export const setRefreshTokenExpirationDate = (expDate: string) =>
  localStorage.setItem(REFRESH_TOKEN_EXP_KEY, expDate);

// remove tokens

export const removeAccessToken = () =>
  localStorage.removeItem(ACCESS_TOKEN_KEY);

export const removeRefreshToken = () =>
  localStorage.removeItem(REFRESH_TOKEN_KEY);

export const removeRefreshTokenExpirationDate = () =>
  localStorage.removeItem(REFRESH_TOKEN_EXP_KEY);

export const removeTokens = () => {
  removeRefreshToken();
  removeAccessToken();
  removeRefreshTokenExpirationDate();
};
