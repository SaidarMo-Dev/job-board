import api from "@/api/axiosInstance";
import type { ApiResponse } from "@/shared/types/ApiResponse";
import type { AdminProfile } from "./adminTypes";

const ADMIN_BASE_URL = "/admin";

export const getAdminProfile = async () => {
  const response = await api.get<ApiResponse<AdminProfile>>(
    `${ADMIN_BASE_URL}/profile`
  );

  return response.data;
};
