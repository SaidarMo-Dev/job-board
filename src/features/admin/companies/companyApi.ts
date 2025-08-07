import api from "@/api/axiosInstance";
import type { CompanyManagement, SortCompany } from "./companyTypes";
import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";

const COMPANY_BASE_URL = "/company";

export async function fetchCompanies(
  page: number,
  size: number,
  search: string,
  sort: SortCompany
) {
  const params = new URLSearchParams({
    Page: page.toString(),
    PageSize: size.toString(),
    Search: search,
    Sort: sort,
  });

  return (
    await api.get<ApiPaginatedResponse<CompanyManagement[]>>(
      `${COMPANY_BASE_URL}?${params.toString()}`
    )
  ).data;
}
