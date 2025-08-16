import type { JobResponse } from "./jobTypes";
import api from "@/api/axiosInstance";
import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import type { ApiResponse } from "@/types/ApiResponse";

const JOB_BASE_URL = "/jobs";

export async function fetchJobs(
  params: string
): Promise<ApiPaginatedResponse<JobResponse[]>> {
  const response = await api.get<ApiPaginatedResponse<JobResponse[]>>(
    `${JOB_BASE_URL}?${params}`
  );

  return response.data;
}

export async function getJobById(
  Id: number
): Promise<ApiResponse<JobResponse>> {
  const response = await api.get<ApiResponse<JobResponse>>(
    `${JOB_BASE_URL}/${Id}`
  );

  return response.data;
}

export async function fetchPopularLocations() {
  return (await api.get<ApiResponse<string[]>>(`${JOB_BASE_URL}/locations`))
    .data.data;
}

