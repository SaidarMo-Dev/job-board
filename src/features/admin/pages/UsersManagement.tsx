import { useEffect, useMemo, useState } from "react";
import UsersFilters from "../users/components/UsersFilters";
import UsersHeader from "../users/components/UsersHeader";
import UserTable from "../users/components/UsersTable";
import type {
  FilterByRole,
  FilterByStatus,
  UserFilterValues,
} from "../users/usersTypes";
import useDebounce from "@/hooks/use-debounce";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { resetUsers } from "../users/userSlice";
import { useSearchParams } from "react-router";
import { fetchAdminUsersThunk } from "../users/userThunk";

export default function UsersManagement() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 800);

  const handleUpdateSearch = (search: string) => {
    setSearchTerm(search);
  };
  // Parse initial state from URL

  const getInitialFilters = (): UserFilterValues => {
    return {
      role: (searchParams.get("FilterByRole") as FilterByRole) || "All",
      status: (searchParams.get("FilterStatus") as FilterByStatus) || "All",
      page: Number(searchParams.get("Page")) || 1,
      PageSize: Number(searchParams.get("Size")) || 10,
    };
  };

  const initialFilters = useMemo(() => getInitialFilters(), [searchParams]);
  const [filters, setFilters] = useState<UserFilterValues>(initialFilters);

  const cleanFilterParams = (newFilter: Partial<UserFilterValues>) => {
    const params = new URLSearchParams();

    // add non default values
    if (debouncedSearch) params.set("Search", debouncedSearch);

    if (newFilter.role !== "All" && newFilter.role)
      params.set("FilterByRole", newFilter.role);
    if (newFilter.status !== "All" && newFilter.status)
      params.set("FilterStatus", newFilter.status);
    if (newFilter.page && newFilter.page > 1)
      params.set("Page", newFilter.page?.toString());
    if (newFilter.PageSize && newFilter.PageSize != 10)
      params.set("Size", newFilter.PageSize.toString());

    return params;
  };

  const updateUrl = (newfilter: UserFilterValues) => {
    const params = cleanFilterParams(newfilter);
    setSearchParams(params, { replace: true });
  };

  // Update URL when debounced search term and filter changes
  useEffect(() => {
    updateUrl(filters);
  }, [debouncedSearch, filters]);

  // handle filter change
  const handleFilterChange = (newFilter: Partial<UserFilterValues>) => {
    setFilters((prev) => {
      const updatedFilters = {
        ...prev,
        ...newFilter,
        // reset page when filters change (except page and pagesize)
        ...(newFilter.role !== undefined || newFilter.status !== undefined
          ? { page: 1 }
          : {}),
      };

      return updatedFilters;
    });
  };

  // // fetch users
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    dispatch(fetchAdminUsersThunk({ query: params.toString() }));
  }, [dispatch, searchParams]);

  // reset AdminUsers state when component unmount
  useEffect(() => {
    return () => {
      dispatch(resetUsers());
    };
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <UsersHeader />
      <UsersFilters
        filters={filters}
        onfilerChange={handleFilterChange}
        search={searchTerm}
        onSearchChange={handleUpdateSearch}
      />
      <UserTable onFilterChange={handleFilterChange} />
    </div>
  );
}
