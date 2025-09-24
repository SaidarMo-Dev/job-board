import api from "@/api/axiosInstance";
import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import type { JobFilters, JobManagement } from "./jobsType";
import { DEFAULT_PAGE_SIZE } from "@/constants/config";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import type { PaginationInfo } from "../users/usersTypes";

const ADMIN_JOBS_BASE_URL = "admin/jobs";

export async function fetchAdminJobs(
  page: number,
  search?: string,
  filters?: JobFilters
): Promise<{ data: JobManagement[]; pagination: PaginationInfo }> {
  const params = new URLSearchParams({
    Page: page.toString(),
    PageSize: DEFAULT_PAGE_SIZE.toString(),
  });

  if (search) params.set("Search", search);

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value))
        value.forEach((val) => params.append(capitalizeFirstLetter(key), val));
    });
  }

  const res = (
    await api.get<ApiPaginatedResponse<JobManagement[]>>(
      `${ADMIN_JOBS_BASE_URL}?${params.toString()}`
    )
  ).data;
  return {
    data: res.data,
    pagination: {
      currentPage: res.currentPage,
      pageSize: res.pageSize,
      totalRecords: res.totalRecords,
      totalPages: res.totalPages,
      hasNextPage: res.hasNextPage,
      hasPreviousPage: res.hasPreviusPage,
    },
  };
}
