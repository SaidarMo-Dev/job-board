import api from "@/api/axiosInstance";
import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import type { UserManagement } from "./usersTypes";
import type { AddFormData, EditFormData } from "./schemas/userSchema";
import type { ApiResponse } from "@/types/ApiResponse";

const ADMIN_USER_BASE_URL = "/Admin/users";

export async function fetchAdminUsers(params: string) {
  const response = await api.get<ApiPaginatedResponse<UserManagement[]>>(
    `${ADMIN_USER_BASE_URL}?${params}`
  );
  return response.data;
}

// Add new user
export async function addUser(userData: AddFormData) {
  const response = await api.post<ApiResponse<number>>(
    `${ADMIN_USER_BASE_URL}`,
    userData
  );
  return response.data;
}

// Update existing user
export async function updateUser(userId: number, userData: EditFormData) {
  const response = await api.put<ApiResponse<string>>(
    `${ADMIN_USER_BASE_URL}`,
    {
      ...userData,
      id: userId,
    }
  );
  return response.data;
}
