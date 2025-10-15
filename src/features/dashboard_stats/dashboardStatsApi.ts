import api from "@/api/axiosInstance";
import type { ApiResponse } from "@/shared/types/ApiResponse";
import type { DashboardStatsType } from "./dashboardStatsTypes";

const DASHBOARD_BASE_URL = `/users`;

export async function getUserDashboardStats(userId: number) {
  const response = await api.get<ApiResponse<DashboardStatsType>>(
    `${DASHBOARD_BASE_URL}/${userId}/dashboard-stats`
  );

  return response.data;
}
