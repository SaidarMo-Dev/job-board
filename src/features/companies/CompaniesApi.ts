import api from "@/api/axiosInstance";
import type { ApiPaginatedResponse } from "@/shared/types/ApiPaginatedResponse";
import type { Company } from "./shared/types/company";
import { buildCompaniesQuery } from "./utils/utils";
import type { CompanySortBy } from "./shared/types/companyEnums";
import type { CompanyFilters } from "./shared/types/companyFilters";

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
