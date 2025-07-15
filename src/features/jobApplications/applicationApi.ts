import api from "@/api/axiosInstance";
import type { ApiResponse } from "@/types/ApiResponse";
import type { ApplicationData } from "./applicationType";

const APPLICATIONS_BASE_URL = "/applications";

export async function applyForJob(applicationData: ApplicationData) {
  const formData = new FormData();

  Object.entries(applicationData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const response = await api<ApiResponse<number>>({
    method: "post",
    url: `${APPLICATIONS_BASE_URL}/apply`,
    data: formData,
  });

  return response.data;
}
