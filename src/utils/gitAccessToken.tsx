import { ACCESS_TOKEN_KEY } from "./constans";

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
