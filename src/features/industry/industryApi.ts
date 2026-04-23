import type { ApiPaginatedResponse } from "@/shared/types/ApiPaginatedResponse";
import api from "../../api/axiosInstance";
import type { Industry } from "./industryTypes";
import { DEFAULT_PAGE_SIZE } from "@/constants/config";

const INDUSTRY_BASE_URL = "/industries";

export const fetchPaginatedIndustries = async (
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
): Promise<ApiPaginatedResponse<Industry[]>> => {
  const response = await api.get<ApiPaginatedResponse<Industry[]>>(
    `${INDUSTRY_BASE_URL}?PageNumeber=${page}&PageSize=${pageSize}`,
  );
  return response.data;
};

export async function fetchIndustries(): Promise<Industry[]> {
  const response = await api.get<ApiPaginatedResponse<Industry[]>>(
    `${INDUSTRY_BASE_URL}`,
  );
  return response.data.data;
}
