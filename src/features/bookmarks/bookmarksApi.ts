import api from "@/api/axiosInstance";
import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import type {
  AddBookmark,
  bookmarkResponse,
  SavedJobIdsResponse,
  UserBookmarkRequest,
} from "./bookmarksTypes";
import type { ApiResponse } from "@/types/ApiResponse";

const BOOKMARKS_BASE_URL = "/bookmarks";

export async function getUserSavedJobs({
  UserId,
  Page,
  PageSize,
}: UserBookmarkRequest) {
  const params = new URLSearchParams();
  params.set("UserId", UserId.toString());
  params.set("Page", Page.toString());
  if (PageSize) params.set("Pagesize", PageSize.toString());
  else params.delete("PageSize");

  const response = await api.get<ApiPaginatedResponse<bookmarkResponse[]>>(
    `/users${BOOKMARKS_BASE_URL}?${params.toString()}`
  );

  return response.data;
}

export async function getTotalUserSavedJobs(userId: string) {
  const response = await api.get<ApiResponse<number>>(
    `/users${BOOKMARKS_BASE_URL}/count?userId=${userId}`
  );

  return response.data;
}

export async function getSavedJobIds(userId) {
  const response = await api.get<ApiResponse<SavedJobIdsResponse>>(
    `${BOOKMARKS_BASE_URL}/${userId}/saved-job-ids`
  );

  return response.data;
}

export async function saveJob(addBookmark: AddBookmark) {
  const response = await api<ApiResponse<number>>({
    method: "post",
    url: `${BOOKMARKS_BASE_URL}/save-job`,
    data: { ...addBookmark },
  });

  return response.data;
}

export async function UnsaveJob(jobId) {
  const response = await api.delete<ApiResponse<string>>(
    `${BOOKMARKS_BASE_URL}/by-jobId/${jobId}`
  );

  return response.data;
}
