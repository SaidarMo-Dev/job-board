import type { CompanySortBy } from "../shared/types/companyEnums";
import type { CompanyFilters } from "../shared/types/companyFilters";

export function buildCompaniesQuery({
  page,
  pageSize,
  sortBy,
  filters,
  search,
}: {
  page: number;
  pageSize: number;
  sortBy?: CompanySortBy;
  filters?: CompanyFilters;
  search: string;
}) {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("pageSize", pageSize.toString());
  params.append("search", search);
  if (sortBy) params.append("sortBy", sortBy);

  if (filters?.location) {
    params.append("search", filters.location);
  }

  if (filters?.companySize) {
    filters.companySize.forEach((value) => params.append("companySize", value));
  }

  return params.toString();
}
