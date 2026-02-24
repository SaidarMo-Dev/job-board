import api from "../../api/axiosInstance";
import type { ApiResponse } from "../../shared/types/ApiResponse";
import type { CurrentUser, UpdateUserRequest, User } from "./userTypes";
import type RegisterFormData from "./userTypes";

const USER_BASE_URL = "/users";

export const createUser = (data: RegisterFormData) =>
  api<ApiResponse<number>>({
    method: "post",
    url: `${USER_BASE_URL}/register`,
    data: { ...data },
    timeout: 5000,
  });

export async function getCurrentUser(): Promise<CurrentUser> {
  const res = await api.get<ApiResponse<User>>(`${USER_BASE_URL}/me`, {});

  return res.data.data;
}

export async function updateUser(data: UpdateUserRequest) {
  const response = await api.put<ApiResponse<string>>(
    `${USER_BASE_URL}/update`,
    {
      ...data,
    },
  );
  return response.data;
}

export async function DeleteUser(Id: number) {
  const response = await api.delete<ApiResponse<string>>(
    `${USER_BASE_URL}/${Id}`,
  );

  return response.data;
}

export async function UplodUserProfileImage(file: File) {
  const formData = new FormData();
  formData.append("ProfileImage", file);

  const response = await api.patch<ApiResponse<string>>(
    `${USER_BASE_URL}/profile-image`,
    formData,
    {
      timeout: 10000,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}
