import api from "@/api/axiosInstance";
import type { CompanyManagement, SortCompany } from "./companyTypes";
import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import type { ApiResponse } from "@/types/ApiResponse";
import type { CompanyFormValues } from "./schemas/CompanySchema";

const COMPANY_BASE_URL = "/companies";

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

export async function addCompany(data: CompanyFormValues) {
  return (
    await api.post<ApiResponse<number>>(`${COMPANY_BASE_URL}`, {
      ...data,
    })
  ).data;
}

export async function updateCompany(
  data: CompanyFormValues,
  companyId: number
) {
  return (
    await api.put<ApiResponse<string>>(`${COMPANY_BASE_URL}`, {
      ...data,
      companyId,
    })
  ).data;
}

export async function fetchCompanyById(Id: number) {
  return (
    await api.get<ApiResponse<CompanyManagement>>(`${COMPANY_BASE_URL}/${Id}`)
  ).data.data;
}

export async function deleteCompany(Id: number) {
  return (await api.delete<ApiResponse<string>>(`${COMPANY_BASE_URL}/${Id}`))
    .data.data;
}
