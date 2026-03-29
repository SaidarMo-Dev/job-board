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

  params.append("Page", page.toString());
  params.append("PageSize", pageSize.toString());
  params.set("Search", search);
  if (sortBy) params.append("SortBy", sortBy);

  if (filters?.location) {
    params.set("Search", filters.location);
  }
  if (filters?.companySize?.length) {
    params.set("Size", filters.companySize.join(","));
  }

  if (filters?.industries) {
    params.set("Industries", filters.industries.join(","));
  }
  return params.toString();
}
