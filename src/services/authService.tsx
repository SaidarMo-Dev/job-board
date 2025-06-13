import type { ApiResponse } from "../types/ApiResponse";
import api from "../api/axiosInstance";
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
