import type { JobResponse } from "./jobTypes";
import api from "@/api/axiosInstance";
import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";

const JOB_BASE_URL = "/jobs";

export async function fetchJobs(
  params: string
): Promise<ApiPaginatedResponse<JobResponse[]>> {
  const response = await api.get<ApiPaginatedResponse<JobResponse[]>>(
    `${JOB_BASE_URL}?${params}`
  );

  return response.data;
}
