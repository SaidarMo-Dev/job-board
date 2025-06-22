import type { ApiResponse } from "../../types/ApiResponse";
import api from "../../api/axiosInstance";
import type { LoginToken } from "../../types/loginResponse";

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

export async function Login(usernameOrEmail: string, password: string) {
  const formData = new URLSearchParams({ usernameOrEmail, password });

  const res = await api.post<ApiResponse<LoginToken>>(
    `${AUTH_BASE_URL}/signin`,
    formData,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  return res.data.data;
}
