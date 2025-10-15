import api from "@/api/axiosInstance";
import type { ApiResponse } from "@/shared/types/ApiResponse";
import type {
  ApplicationData,
  ApplicationStatusFilterType,
  UserApplicationResponse,
} from "./applicationType";
import type { ApiPaginatedResponse } from "@/shared/types/ApiPaginatedResponse";
import type { RecentApplication } from "../dashboard/dashboardTypes";

const APPLICATIONS_BASE_URL = "/applications";

export async function applyForJob(applicationData: ApplicationData) {
  const formData = new FormData();

  Object.entries(applicationData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  console.log(formData.get("resume"));
  const response = await api.post<ApiResponse<number>>(
    `${APPLICATIONS_BASE_URL}/apply`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function getUserApplications(
  page: number,
  size: number,
  statusFilter: ApplicationStatusFilterType
) {
  const params = new URLSearchParams();
  params.append("Page", page.toString());
  params.append("PageSize", size.toString());
  params.append("StatusFilter", statusFilter);
  const response = await api.get<
    ApiPaginatedResponse<UserApplicationResponse[]>
  >(`/users${APPLICATIONS_BASE_URL}?${params.toString()}`);

  return response.data;
}

export async function fetchRecentApplications(take: number) {
  return (
    await api.get<ApiResponse<RecentApplication[]>>(
      `${APPLICATIONS_BASE_URL}/recent-applications?take=${take}`
    )
  ).data.data;
}

export async function getAppliedJobIds() {
  const response = await api.get<ApiResponse<number[]>>(
    `${APPLICATIONS_BASE_URL}/applied-job-ids`
  );

  return response.data;
}
