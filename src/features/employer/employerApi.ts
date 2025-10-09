import api from "@/api/axiosInstance";
import type { ApiResponse } from "@/types/ApiResponse";
import type { EmployerDashboardStats, EmployerJob } from "./employerTypes";
import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import { DEFAULT_PAGE_SIZE } from "@/constants/config";

const EMPLOYER_BASE_URL = "/employer";

export async function getEmployerDashboardStats(): Promise<EmployerDashboardStats> {
  return (await api.get<ApiResponse<EmployerDashboardStats>>(EMPLOYER_BASE_URL))
    .data.data;
}

export async function fetchEmployerJobs(
  page: number = 1,
  search: string = ""
) {
  const query = new URLSearchParams();
  query.set("Page", page.toString());
  query.set("Size", DEFAULT_PAGE_SIZE.toString());
  query.set("Search", search);

  return (
    await api.get<ApiPaginatedResponse<EmployerJob[]>>(
      `${EMPLOYER_BASE_URL}/posted-jobs?${query.toString()}`
    )
  ).data.data;

}
