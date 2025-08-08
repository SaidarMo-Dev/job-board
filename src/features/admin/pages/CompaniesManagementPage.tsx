import { useAppDispatch } from "@/hooks/useAppDispatch";
import CompaniesHeader from "../companies/components/CompaniesHeader";
import CompaniesTable from "../companies/components/CompaniesTable";
import CompanySearchFilter from "../companies/components/CompanySearchFilter";
import { useEffect, useState } from "react";
import type { SortCompany } from "../companies/companyTypes";
import useDebounce from "@/hooks/use-debounce";
import { useSearchParams } from "react-router";
import { fetchCompaniesThunk } from "../companies/companyThunk";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectAdminCompanies } from "../companies/companySlice";

export default function CompaniesManagementPage() {
  const [filters, setFilters] = useState<{ search: string; sort: SortCompany }>(
    { search: "", sort: "NameAsc" }
  );
  const [page, setPage] = useState(1);

  const dispatch = useAppDispatch();
  const debouncedSearch = useDebounce(filters.search, 500);
  const [searchParams, setSearchParams] = useSearchParams();

  // clean filters
  const cleanFilterParams = () => {
    const params = new URLSearchParams();

    // add non default values
    if (debouncedSearch) params.set("Search", debouncedSearch);

    if (filters.search) params.set("Search", filters.search);
    if (filters.sort && filters.sort !== "NameAsc")
      params.set("SortBy", filters.sort);

    if (page && page > 1) params.set("Page", page.toString());

    return params;
  };

  // update url
  useEffect(() => {
    const params = cleanFilterParams();
    setSearchParams(params);
  }, [debouncedSearch, page, filters.sort]);

  //fetch users
  useEffect(() => {
    dispatch(
      fetchCompaniesThunk({
        page: page,
        size: 10,
        search: debouncedSearch,
        sort: filters.sort,
      })
    );
  }, [dispatch, page, debouncedSearch, filters.sort]);

  const companies = useAppSelector(selectAdminCompanies);
  return (
    <>
      <div className="container mx-auto p-6 space-y-6">
        <CompaniesHeader onAddCompany={() => console.log("")} />
        <CompanySearchFilter
          searchTerm={filters.search}
          sort={filters.sort}
          onSortChange={(value) =>
            setFilters((prev) => ({ ...prev, sort: value }))
          }
          onSearchChange={(value) =>
            setFilters((prev) => ({ ...prev, search: value }))
          }
        />
        <CompaniesTable
          companies={companies}
          searchTerm=""
          onEditCompany={() => console.log("")}
          onDeleteCompany={() => console.log("")}
          onShowInfo={() => console.log("")}
          onPageChange={() => console.log("")}
        />
      </div>
    </>
  );
}
