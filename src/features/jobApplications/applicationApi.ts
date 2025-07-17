import api from "@/api/axiosInstance";
import type { ApiResponse } from "@/types/ApiResponse";
import type { ApplicationData } from "./applicationType";

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
