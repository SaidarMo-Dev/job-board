import api from "@/api/axiosInstance";
import type { CompanyManagement, SortCompany } from "./companyTypes";
import type { ApiPaginatedResponse } from "@/types/ApiPaginatedResponse";
import type { ApiResponse } from "@/types/ApiResponse";
import type { CompanyFormValues } from "./schemas/CompanySchema";
import type { CompanyOption } from "../jobs/jobsType";

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

export async function fetchPopularCompanies() {
  return (await api.get<ApiResponse<string[]>>(`${COMPANY_BASE_URL}/popular`))
    .data.data;
}

export async function fetchCompaniesSummary(
  page: number,
  size: number
): Promise<ApiPaginatedResponse<CompanyOption[]>> {
  return (
    await api.get<ApiPaginatedResponse<CompanyOption[]>>(
      `${COMPANY_BASE_URL}/summary?page=${page}&size=${size}`
    )
  ).data;
}

export async function getCompanyById<T>(
  id: number,
  fields?: string
): Promise<ApiResponse<T>> {
  const query = fields ? `?fields=${encodeURIComponent(fields)}` : "";
  return (await api.get<ApiResponse<T>>(`${COMPANY_BASE_URL}/${id}${query}`))
    .data;
}
