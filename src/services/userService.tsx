import api from "../api/axiosInstance";
import type { ApiResponse } from "../types/ApiResponse";
import type RegisterFormData from "../types/RegisterFormData";

const USER_BASE_URL = "/users";

export const createUser = (data: RegisterFormData) =>
  api<ApiResponse<number>>({
    method: "post",
    url: `${USER_BASE_URL}/register`,
    data: { ...data },
  });

interface ConfirmEmailType {
  userId: number;
  token: string;
}

export const ConfirmEmail = (data: ConfirmEmailType) => {
  api.get<ApiResponse<string>>(
    `${USER_BASE_URL}/ConfirmEmail?userId=${
      data.userId
    }&token=${encodeURIComponent(data.token)}`
  );
};
