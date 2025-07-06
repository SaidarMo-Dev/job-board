import api from "@/api/axiosInstance";
import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import type { bookmarkResponse } from "./bookmarksTypes";

const BOOKMARKS_BASE_URL = "/bookmarks";

export async function getUserSavedJobs(params: string) {
  
  const response = await api.get<ApiPaginatedResponse<bookmarkResponse[]>>(
    `/users${BOOKMARKS_BASE_URL}?${params}`
  );

  return response.data;
}
