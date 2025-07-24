import { getAccessToken } from "@/utils/gitAccessToken";
import api from "../../api/axiosInstance";
import type { ApiResponse } from "../../types/ApiResponse";
import type { CurrentUser, UpdateUserRequest, User } from "./userTypes";
import type RegisterFormData from "./userTypes";

const USER_BASE_URL = "/users";

export const createUser = (data: RegisterFormData) =>
  api<ApiResponse<number>>({
    method: "post",
    url: `${USER_BASE_URL}/register`,
    data: { ...data },
    timeout: 10000,
  });

export async function getCurrentUser(): Promise<CurrentUser> {
  const accToken = getAccessToken();
  const res = await api.get<ApiResponse<User>>(`${USER_BASE_URL}/me`, {
    headers: {
      Authorization: `bearer ${accToken}`,
    },
  });

  return res.data.data;
}

export async function updateUser(data: UpdateUserRequest) {
  const response = await api.put<ApiResponse<string>>(
    `${USER_BASE_URL}/update`,
    {
      ...data,
    },
    {
      headers: {
        Authorization: `bearer ${getAccessToken()}`,
      },
    }
  );
  return response.data;
}
