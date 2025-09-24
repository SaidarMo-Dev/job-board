import type { JobResponse, JobResponseSummary } from "./jobTypes";
import api from "@/api/axiosInstance";
import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import type { ApiResponse } from "@/types/ApiResponse";
import type { PaginationInfo } from "../admin/users/usersTypes";
import type { JobFormValues } from "../admin/jobs/schemas/jobSchema";

const JOB_BASE_URL = "/jobs";

export async function fetchJobs(
  params: string
): Promise<{ jobs: JobResponse[]; pagination: PaginationInfo }> {
  const res = (
    await api.get<ApiPaginatedResponse<JobResponse[]>>(
      `${JOB_BASE_URL}?${params}`
    )
  ).data;

  return {
    jobs: res.data,
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

export async function getJobById(
  Id: number
): Promise<ApiResponse<JobResponse>> {
  const response = await api.get<ApiResponse<JobResponse>>(
    `${JOB_BASE_URL}/${Id}`
  );

  return response.data;
}

export async function getJobByIdSummary(
  Id: number
): Promise<ApiResponse<JobResponseSummary>> {
  const response = await api.get<ApiResponse<JobResponseSummary>>(
    `${JOB_BASE_URL}/${Id}/summary`
  );

  return response.data;
}

export async function fetchPopularLocations() {
  return (await api.get<ApiResponse<string[]>>(`${JOB_BASE_URL}/locations`))
    .data.data;
}

export async function fetchRecommendationJobs() {
  return (
    await api.get<ApiResponse<JobResponse[]>>(`${JOB_BASE_URL}/recommendations`)
  ).data.data;
}

export async function addJob(data: JobFormValues) {
  return (
    await api.post<ApiResponse<number>>(`${JOB_BASE_URL}`, {
      ...data,
    })
  ).data;
}

export async function updateJob(id: number, data: JobFormValues) {
  return (
    await api.put<ApiResponse<string>>(`${JOB_BASE_URL}`, {
      id: id,
      ...data,
    })
  ).data;
}
