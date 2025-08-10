"use client";

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
import AddEditUserModal from "../users/components/AddEditUserModal";

export default function UsersManagement() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [openUserModal, setOpenUserModal] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 500);

  // Parse filters from URL params
  const getInitialFilters = (): UserFilterValues => ({
    role: (searchParams.get("FilterByRole") as FilterByRole) || "All",
    status: (searchParams.get("FilterStatus") as FilterByStatus) || "All",
    page: Number(searchParams.get("Page")) || 1,
    PageSize: Number(searchParams.get("Size")) || 10,
  });

  const initialFilters = useMemo(getInitialFilters, [searchParams]);
  const [filters, setFilters] = useState<UserFilterValues>(initialFilters);

  // Build URLSearchParams from filters
  const buildSearchParams = (filterValues: UserFilterValues) => {
    const params = new URLSearchParams();

    if (debouncedSearch) params.set("Search", debouncedSearch);
    if (filterValues.role !== "All")
      params.set("FilterByRole", filterValues.role ?? "All");
    if (filterValues.status !== "All")
      params.set("FilterStatus", filterValues.status ?? "All");
    if (filterValues.page > 1) params.set("Page", filterValues.page.toString());
    if (filterValues.PageSize !== 10)
      params.set("Size", filterValues.PageSize.toString());

    return params;
  };

  // Sync URL when filters or search changes
  useEffect(() => {
    const params = buildSearchParams(filters);
    setSearchParams(params, { replace: true });
  }, [filters, debouncedSearch]);

  // Fetch users when search params change
  useEffect(() => {
    dispatch(fetchAdminUsersThunk({ query: searchParams.toString() }));
  }, [dispatch, searchParams]);

  // Reset users when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetUsers());
    };
  }, [dispatch]);

  // Handle filter updates
  const handleFilterChange = (newFilter: Partial<UserFilterValues>) => {
    setFilters((prev) => {
      const resetPage =
        newFilter.role !== undefined || newFilter.status !== undefined;
      return {
        ...prev,
        ...newFilter,
        ...(resetPage ? { page: 1 } : {}),
      };
    });
  };

  return (
    <div className="space-y-6">
      <UsersHeader onAddUserClick={() => setOpenUserModal(true)} />
      <UsersFilters
        filters={filters}
        onfilerChange={handleFilterChange}
        search={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <UserTable onFilterChange={handleFilterChange} />
      <AddEditUserModal
        isOpen={openUserModal}
        mode="AddNew"
        onClose={() => setOpenUserModal(false)}
      />
    </div>
  );
}
