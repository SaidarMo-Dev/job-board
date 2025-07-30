import api from "@/api/axiosInstance";
import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import type { UserManagement } from "./usersTypes";

const ADMIN_USER_BASE_URL = "/Admin/users";

export async function fetchAdminUsers(params: string) {
  const response = await api.get<ApiPaginatedResponse<UserManagement[]>>(
    `${ADMIN_USER_BASE_URL}?${params}`
  );
  return response.data;
}
