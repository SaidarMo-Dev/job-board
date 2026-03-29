import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useDebounce from "@/hooks/use-debounce";

import {
  COMPANY_SIZE_OPTIONS,
  type CompanySize,
  type CompanySortBy,
} from "../shared/types/companyEnums";
import type { CompanyFilters } from "../shared/types/companyFilters";

const isCompanySize = (value: string): value is CompanySize => {
  return COMPANY_SIZE_OPTIONS.some((opt) => opt.value === value);
};

export function useCompaniesFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 🔹 Init from URL
  const initialPage = Number(searchParams.get("page")) || 1;

  const initialSearch = (searchParams.get("search") as string) || "";

  const initialSort = (searchParams.get("sortBy") as CompanySortBy) || "Name";

  const initialSizes = searchParams.getAll("Size").filter(isCompanySize);
  const initialIndustries = searchParams.getAll("Industries");

  const initialFilters: CompanyFilters = {
    location: searchParams.get("location") || "",
    companySize: initialSizes.length ? initialSizes : undefined,
    industries: initialIndustries.length ? initialIndustries : undefined,
  };

  // 🔹 State
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sortBy, setSortBy] = useState<CompanySortBy>(initialSort);
  const [filters, setFilters] = useState<CompanyFilters>(initialFilters);
  const [search, setSearch] = useState(initialSearch);

  // Debounce (ONLY for API)
  const locationDebounce = useDebounce(filters.location, 500);

  // Debounce (ONLY for API)
  const searchDebounce = useDebounce(search, 500);

  // Sync → URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.set("Search", search);

    params.set("SortBy", sortBy);

    if (filters.location) {
      params.set("Location", filters.location);
    }

    if (filters.companySize?.length) {
      params.set("Size", filters.companySize.join(","));
    }
    if (filters.industries?.length) {
      params.set("Industries", filters.industries.join(","));
    }

    setSearchParams(params, { replace: true });
  }, [currentPage, sortBy, filters, setSearchParams, search]);

  // Reset page on filter/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, filters.companySize, locationDebounce, search]);

  return {
    search,
    setSearch,
    searchDebounce,
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
    filters,
    setFilters,
    debouncedFilters: {
      ...filters,
      location: locationDebounce,
    },
  };
}
