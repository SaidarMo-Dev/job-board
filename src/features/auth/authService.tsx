import type { ApiResponse } from "../../types/ApiResponse";
import api from "../../api/axiosInstance";
import type { LoginToken } from "../../types/loginResponse";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_EXP_KEY,
  REFRESH_TOKEN_KEY,
} from "@/utils/constans";
interface ConfirmEmailType {
  userId: number;
  token: string;
}

const AUTH_BASE_URL = "/auth";
export const ConfirmEmail = (data: ConfirmEmailType) => {
  api.get<ApiResponse<string>>(
    `${AUTH_BASE_URL}/confirm-email?userId=${
      data.userId
    }&token=${encodeURIComponent(data.token)}`
  );
};

export async function Login(username: string, password: string) {
  try {
    const formData = new URLSearchParams({ username, password });

    const res = await api.post<ApiResponse<LoginToken>>(
      `${AUTH_BASE_URL}/signin`,
      formData,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const data = res.data.data;

    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken.refreshToken);
    localStorage.setItem(
      REFRESH_TOKEN_EXP_KEY,
      data.refreshToken.expirationDate.toString()
    );

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
}
