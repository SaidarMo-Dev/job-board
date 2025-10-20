import type { JobResponse, JobResponseSummary } from "./jobTypes";
import api from "@/api/axiosInstance";
import type { ApiPaginatedResponse } from "@/shared/types/ApiPaginatedResponse";
import type { ApiResponse } from "@/shared/types/ApiResponse";
import type { PaginationInfo } from "../admin/users/usersTypes";
import type { JobFormValues } from "../admin/jobs/schemas/jobSchema";
import type { ApplicantSummary } from "@/shared/types/ApplicantSummary";
import { DEFAULT_PAGE_SIZE } from "@/constants/config";
import type { FilterApplicantsKey } from "@/shared/types/FilterApplicants";
import type { SortApplicantsKeys } from "@/shared/types/SortApplicantsBy";

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

export async function deleteJob(id: number) {
  try {
    await api.delete<ApiResponse<string>>(`${JOB_BASE_URL}/${id}`);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getJobApplicants(
  id: number,
  page: number,
  filter?: FilterApplicantsKey,
  sort?: SortApplicantsKeys
): Promise<ApiPaginatedResponse<ApplicantSummary[]>> {
  const params = new URLSearchParams();

  params.append("JobId", id.toString());
  params.append("Page", page.toString());
  params.append("Size", DEFAULT_PAGE_SIZE.toString());
  if (filter) params.append("Filter", filter);
  if (sort) params.append("Sort", sort);

  return (
    await api.get<ApiPaginatedResponse<ApplicantSummary[]>>(
      `${JOB_BASE_URL}/applicants/summary?${params.toString()}`
    )
  ).data;
}
