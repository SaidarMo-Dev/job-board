import api from "@/api/axiosInstance";
import type {
  addCompanyRequest,
  CompanyManagement,
  SortCompany,
  updateCompanyRequest,
} from "./companyTypes";
import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import type { ApiResponse } from "@/types/ApiResponse";

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

export async function addCompany(company: addCompanyRequest) {
  return (
    await api.post<ApiResponse<number>>(`${COMPANY_BASE_URL}`, {
      ...company,
    })
  ).data;
}

export async function updateCompany(company: updateCompanyRequest) {
  return (
    await api.put<ApiResponse<string>>(`${COMPANY_BASE_URL}`, {
      ...company,
    })
  ).data;
}
