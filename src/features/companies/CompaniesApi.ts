import api from "@/api/axiosInstance";
import type { ApiPaginatedResponse } from "@/shared/types/ApiPaginatedResponse";
import type { Company } from "./shared/types/company";
import { buildCompaniesQuery } from "./utils/utils";
import type { CompanySortBy } from "./shared/types/companyEnums";
import type { CompanyFilters } from "./shared/types/companyFilters";
import type { ApiResponse } from "@/shared/types/ApiResponse";
import type { JobResponse } from "../jobs/jobTypes";
import type { CompanyFormValues } from "../employer/company/schemas/companySchema";

const COMPANY_BASE_URL = "/companies";

export async function fetchCompanies(
  page: number,
  search: string,
  pageSize: number,
  filters?: CompanyFilters,
  sortBy?: CompanySortBy,
) {
  const query = buildCompaniesQuery({
    page,
    pageSize,
    sortBy,
    filters,
    search,
  });
  return (
    await api.get<ApiPaginatedResponse<Company[]>>(
      `${COMPANY_BASE_URL}?${query}`,
    )
  ).data;
}

export async function fetchFeaturedCompanies() {
  return (
    await api.get<ApiPaginatedResponse<Company[]>>(
      `${COMPANY_BASE_URL}/featured`,
    )
  ).data;
}

export async function fetchCompanyById(
  id: number,
): Promise<ApiResponse<Company>> {
  return (await api.get<ApiResponse<Company>>(`${COMPANY_BASE_URL}/${id}`))
    .data;
}

export async function fetchCompanyBySlug(
  slug: string,
): Promise<ApiResponse<Company>> {
  return (await api.get<ApiResponse<Company>>(`${COMPANY_BASE_URL}/${slug}`))
    .data;
}

export async function fetchCompanyOpenJobs(
  slug: string,
  page: number,
  pageSize: number,
): Promise<ApiPaginatedResponse<JobResponse[]>> {
  return (
    await api.get<ApiPaginatedResponse<JobResponse[]>>(
      `${COMPANY_BASE_URL}/${slug}/jobs?Page=${page}&Size=${pageSize}`,
    )
  ).data;
}

export async function addCompany(
  company: CompanyFormValues,
): Promise<ApiResponse<string>> {
  const response = await api.post<ApiResponse<string>>(
    `${COMPANY_BASE_URL}`,
    company,
  );
  return response.data;
}

export async function updateCompany(
  id: number,
  company: CompanyFormValues,
): Promise<ApiResponse<string>> {
  const response = await api.put<ApiResponse<string>>(
    `${COMPANY_BASE_URL}/${id}`,
    company,
  );
  return response.data;
}
