import type { ApiPaginatedResponse } from "@/shared/types/ApiPaginatedResponse";
import api from "../../api/axiosInstance";
import type { Industry } from "./industryTypes";

const INDUSTRY_BASE_URL = "/industries";

export const fetchIndustries = async (): Promise<Industry[]> => {
  const response = api.get<ApiPaginatedResponse<Industry[]>>(
    `${INDUSTRY_BASE_URL}`,
  );
  return (await response).data.data;
};
