import { getAccessToken } from "@/utils/gitAccessToken";
import api from "../../api/axiosInstance";
import type { ApiResponse } from "../../types/ApiResponse";
import type { User } from "./userTypes";
import type RegisterFormData from "./userTypes";

const USER_BASE_URL = "/users";

export const createUser = (data: RegisterFormData) =>
  api<ApiResponse<number>>({
    method: "post",
    url: `${USER_BASE_URL}/register`,
    data: { ...data },
  });

export async function getCurrentUser(): Promise<User> {
  const res = await api.get<ApiResponse<User>>(`${USER_BASE_URL}/me`, {
    headers: {
      Authorization: `bearer ${getAccessToken()}`,
    },
  });

  return res.data.data;
}
