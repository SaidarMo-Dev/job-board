import api from "@/api/axiosInstance";
import type { ApiResponse } from "../types/ApiResponse";

const FILE_BASE_URL = "/files";

export async function getSignedUrl(
  fileResourceId: number,
  download: boolean,
): Promise<string> {
  const response = await api.get<ApiResponse<string>>(
    `${FILE_BASE_URL}/signed-url/${fileResourceId}?Download=${download}`,
  );

  return response.data.data;
}
